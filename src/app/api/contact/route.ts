import { after } from 'next/server';
import { sendContactNotification, sendSubmissionAcknowledgment } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return Response.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { success: false, error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    after(async () => {
      try {
        await Promise.all([
          sendContactNotification({ name, email, subject, message }),
          sendSubmissionAcknowledgment({ name, email, subject, message }),
        ]);
      } catch (err) {
        console.error('Failed to send contact emails:', err);
      }
    });

    return Response.json(
      { success: true, message: 'Thank you for reaching out! We will get back to you shortly.' },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, error: 'Invalid request payload.' },
      { status: 400 }
    );
  }
}
