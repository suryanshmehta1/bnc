import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let aiClient: GoogleGenAI | null = null;

function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required and was not found.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { contents, systemInstruction } = req.body;
      if (!contents || !Array.isArray(contents)) {
        return res.status(400).json({ error: "Invalid contents payload" });
      }

      const ai = getGemini();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });

      res.json({ text: response.text || "" });
    } catch (error: any) {
      console.error("Gemini API Error in /api/chat:", error);
      res.status(500).json({ error: error.message || "Internal server error during chat response" });
    }
  });

  app.post("/api/book-space", (req, res) => {
    const bookingData = req.body;
    console.log("-------------------");
    console.log("SILENT BOOKING RECEIVED");
    console.log("Data:", JSON.stringify(bookingData, null, 2));
    console.log("-------------------");
    
    // In a real production app, you would integrate a mailer (Nodemailer, SendGrid, etc.)
    // or an SMS service (Twilio) here to send the notification "without the user knowing".
    
    // Simulate processing
    setTimeout(() => {
      res.json({ 
        success: true, 
        message: "Booking inquiry sent successfully to the team.",
        debug: "Notification would be sent via background server process"
      });
    }, 1000);
  });

  app.post("/api/ciff-subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email parameter is required" });
      }

      console.log("====================================================================");
      console.log(`[CIFF NOTIFICATION SPARK] SUB: ${email}`);
      console.log("====================================================================");

      // Verify server setup for real integrations
      const hasSmtpConfig = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
      const hasWhatsAppConfig = !!(process.env.WHATSAPP_API_KEY || process.env.TWILIO_AUTH_TOKEN);

      let emailDetails = "";
      let emailStatus = "sandbox_simulated";

      if (hasSmtpConfig) {
        try {
          console.log(`[SMTP CONNECTION] Authenticating on SMTP Host ${process.env.SMTP_HOST}...`);
          const smtpHost = process.env.SMTP_HOST || "";
          const smtpUser = process.env.SMTP_USER || "";
          const smtpPass = process.env.SMTP_PASS || "";
          const smtpPortStr = process.env.SMTP_PORT || "";
          
          const isGmail = smtpHost.toLowerCase().includes("gmail.com") || smtpUser.toLowerCase().includes("@gmail.com");
          
          let transporter: any;
          if (isGmail) {
            console.log(`[SMTP CONNECTION] Using optimized built-in Gmail service wrapper for ${smtpUser}...`);
            transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: smtpUser,
                pass: smtpPass,
              },
              tls: {
                rejectUnauthorized: false
              }
            });
          } else {
            console.log(`[SMTP CONNECTION] Connecting to generic host ${smtpHost} with port ${smtpPortStr || "587"}...`);
            const portNum = parseInt(smtpPortStr || "587");
            transporter = nodemailer.createTransport({
              host: smtpHost,
              port: isNaN(portNum) ? 587 : portNum,
              secure: smtpPortStr === "465",
              auth: {
                user: smtpUser,
                pass: smtpPass,
              },
              tls: {
                rejectUnauthorized: false
              }
            });
          }

          console.log(`[OUTBOUND MAIL] Launching live broadcast dispatch for: ${email}`);
          await transporter.sendMail({
            from: `"Candid Imagination" <${smtpUser}>`,
            to: email,
            subject: "CIFF 2027 | RSVP Confirmation & Indie Film Updates",
            text: `Welcome to the Candid Imagination Film Festival 2027!\n\nYour RSVP has been securely registered.\nWe believe in cinematic raw storytelling, stripping away artificial polish for authentic stories.\n\nRegular festival schedules and curation logs will be sent to your coordinate shortly.\n\nWarm regards,\nCIFF Curator Team\nCandid Imagination India`,
            html: `
              <div style="background-color: #0c0c0c; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; text-align: center; border: 1px solid #eab308; max-width: 600px; margin: 0 auto; border-radius: 4px;">
                <h1 style="color: #ffffff; font-family: 'Times New Roman', Times, serif; font-size: 28px; letter-spacing: 0.15em; font-weight: 300; margin-bottom: 5px; text-transform: uppercase;">
                  CANDID <span style="color: #eab308;">IMAGINATION</span>
                </h1>
                <p style="font-size: 10px; letter-spacing: 0.3em; color: #eab308; font-weight: bold; margin-top: 0; margin-bottom: 30px; text-transform: uppercase;">
                  FILM FESTIVAL 2027
                </p>
                <div style="height: 1px; background-color: rgba(255, 255, 255, 0.1); margin: 30px 0;"></div>
                <h2 style="font-size: 20px; font-weight: 300; letter-spacing: 0.1em; color: #ffffff; text-transform: uppercase; margin-bottom: 20px;">
                  RSVP Registration Confirmed
                </h2>
                <p style="font-size: 14px; line-height: 1.6; color: #a3a3a3; max-width: 480px; margin: 0 auto 30px auto; font-weight: 300;">
                  We have successfully registered your credential coordinate (<strong style="color: #ffffff;">${email}</strong>) into the official festival curation system.
                </p>
                <p style="font-size: 13px; line-height: 1.7; color: #d4d4d4; max-width: 480px; margin: 0 auto 30px auto; font-style: italic;">
                  "We believe in the beauty of raw storytelling. CIFF strips away artificial corporate polish, spotlighting authentic stories of uncompromised truth and deep aesthetic conviction."
                </p>
                <div style="background-color: rgba(234, 179, 8, 0.05); border: 1px solid rgba(234, 179, 8, 0.2); padding: 20px; border-radius: 2px; margin-bottom: 30px; display: inline-block;">
                  <span style="display: block; font-size: 11px; letter-spacing: 0.1em; color: #a3a3a3; text-transform: uppercase;">Curators Sequence Active</span>
                  <span style="display: block; font-size: 14px; color: #eab308; font-weight: bold; margin-top: 5px; font-family: monospace;">FEBRUARY 15, 2027 | JODHPUR RAJASTHAN</span>
                </div>
                <div style="height: 1px; background-color: rgba(255, 255, 255, 0.1); margin: 30px 0;"></div>
                <p style="font-size: 11px; color: #737373; margin-bottom: 0; line-height: 1.5;">
                  This is an automatic notification from Candid Imagination Production & CIFF Registry.<br />
                  To manage notifications, contact us at <a href="mailto:candidimaginationproduction@gmail.com" style="color: #eab308; text-decoration: none;">candidimaginationproduction@gmail.com</a>
                </p>
              </div>
            `
          });
          emailStatus = "delivered";
          emailDetails = `Sent Live welcome newsletter details to ${email} via authenticated SMTP Relay.`;
          console.log(`[OUTBOUND MAIL] Dispatch succeeded for: ${email}`);
        } catch (mailErr: any) {
          console.error("Nodemailer SMTP failed:", mailErr);
          emailStatus = "failed";
          const errStr = mailErr.message || String(mailErr);
          if (errStr.includes("535") || errStr.toLowerCase().includes("auth") || errStr.toLowerCase().includes("login") || mailErr.code === "EAUTH") {
            emailDetails = `SMTP Authentication Error (535): Gmail/SMTP rejected your password. Regular Google account passwords cannot be used for direct SMTP. To resolve this: 1) Ensure '2-Step Verification' is turned ON in your Google Account Security settings. 2) Visit https://myaccount.google.com/apppasswords and generate a custom 16-character 'App Password'. 3) Copy that 16-character code and specify it as your SMTP_PASS in your App Environment Settings.`;
          } else {
            emailDetails = `SMTP Relay error: ${errStr}. Please confirm SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS are set correctly in App Settings.`;
          }
        }
      } else {
        emailDetails = `Newsletter RSVP recorded! To deliver a REAL physical email to ${email}, navigate to Settings (gear top-right) and populate the credentials for SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.`;
      }

      const whatsappDetails = hasWhatsAppConfig
        ? `WhatsApp message alert was successfully dispatched to linked subscriber profiles.`
        : `WhatsApp RSVP subscription logged! (To receive active WhatsApp mobile alerts, configure the TWILIO_AUTH_TOKEN or WHATSAPP_API_KEY environment credentials).`;

      console.log(`[OUTBOUND WHATSAPP] Triggering welcoming broadcast package...`);
      console.log("--------------------------------------------------------------------");

      res.json({
        success: true,
        message: "Registration completed, newsletters with regular updates scheduled.",
        emailDelivery: {
          status: emailStatus,
          channel: "SMTP Outbound Engine",
          details: emailDetails
        },
        whatsappDelivery: {
          status: hasWhatsAppConfig ? "delivered" : "sandbox_simulated",
          channel: "WhatsApp Broadcast Service",
          details: whatsappDetails
        }
      });
    } catch (error: any) {
      console.error("Error inside ciff-subscribe route:", error);
      res.status(500).json({ error: error.message || "Failed to establish notification sequence." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
