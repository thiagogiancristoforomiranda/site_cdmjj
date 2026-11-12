const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const CLEANUP_THRESHOLD = 5_000;

const buckets = new Map<string, number[]>();

type RateLimitResult =
  | { allowed: true; retryAfter: 0 }
  | { allowed: false; retryAfter: number };

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0] ?? now;
    return {
      allowed: false,
      retryAfter: Math.max(
        1,
        Math.ceil((WINDOW_MS - (now - oldest)) / 1000),
      ),
    };
  }

  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > CLEANUP_THRESHOLD) {
    for (const [bucketKey, timestamps] of buckets) {
      const active = timestamps.filter(
        (timestamp) => now - timestamp < WINDOW_MS,
      );
      if (active.length === 0) buckets.delete(bucketKey);
      else buckets.set(bucketKey, active);
    }
  }

  return { allowed: true, retryAfter: 0 };
}
