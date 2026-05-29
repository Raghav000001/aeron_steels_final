import { after } from 'next/server';
import { sendContactNotification, sendSubmissionAcknowledgment } from '@/lib/email';
import { errorResponse, successResponse, checkRateLimit } from '@/lib/api-helpers';
import { contactFormSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(`contact:${ip}`, 5, 60_000)) {
      return errorResponse('Too many requests. Please try again later.', 429);
    }

    const body = await request.json();

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Validation failed';
      return errorResponse(firstError, 400);
    }

    const { name, email, subject, message } = parsed.data;

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

    return successResponse(
      { message: 'Thank you for reaching out! We will get back to you shortly.' },
      200
    );
  } catch {
    return errorResponse('Invalid request payload.', 400);
  }
}
