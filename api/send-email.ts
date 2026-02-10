import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { data, error } = await resend.emails.send({
            from: 'DJ SEYJ Website <onboarding@resend.dev>', // Update this if you have a custom domain
            to: [process.env.TO_EMAIL || 'mandemseyj@gmail.com'],
            replyTo: email,
            subject: `Contact Form: ${subject || 'New Message'}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        if (error) {
            console.error('Resend API Error:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
