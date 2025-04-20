const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { firstName, lastName, email, phone, message } = req.body;
  const fullName = `${firstName} ${lastName}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bhaveshdesale16@gmail.com",
      pass: "mnxu hxce wxyt txyv",
    },
  });

  const mailOptions = {
    from: fullName,
    to: "bhaveshdesale16@gmail.com",
    subject: "Portfolio Contact Form Submission",
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ status: "Message sent successfully" });
  } catch (err) {
    console.error("❌ Email error:", err);
    return res.status(500).json({ status: "Message not sent", error: err.message });
  }
};
