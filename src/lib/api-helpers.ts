import { ENV } from './env';


export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    totalPages?: number;
    total?: number;
  };
}

export function successResponse<T>(data: T, status = 200, meta?: ApiResponse['meta']) {
  return Response.json({ success: true, data, meta } satisfies ApiResponse<T>, {
    status,
  });
}

export function errorResponse(error: string, status = 400) {
  return Response.json({ success: false, error } satisfies ApiResponse, {
    status,
  });
}


export function requireAdmin(request: Request): Response | null {
  const authHeader = request.headers.get('authorization');
  const apiKey = ENV.ADMIN_API_KEY;

  if (!apiKey) {
    return errorResponse('Server misconfiguration: ADMIN_API_KEY not set', 500);
  }

  if (!authHeader || authHeader !== `Bearer ${apiKey}`) {
    return errorResponse('Unauthorized. Provide a valid Bearer token.', 401);
  }

  return null; // authorized
}


interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}


export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidObjectId(id: string): boolean {
  return /^[a-fA-F0-9]{24}$/.test(id);
}
