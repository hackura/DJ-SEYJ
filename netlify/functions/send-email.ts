
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: Request) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { name, email, subject, message } = await req.json() as { name: string; email: string; subject: string; message: string };

        // Basic validation
        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const data = await resend.emails.send({
            from: 'DJ SEYJ Website <onboarding@resend.dev>', // Update this if you have a custom domain
            to: [process.env.TO_EMAIL || 'mandemseyj@gmail.com'], // Fallback for safety, but should be set in environment
            subject: `Contact Form: ${subject || 'New Message'}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
            replyTo: email, // Allow replying directly to the sender
        });

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
