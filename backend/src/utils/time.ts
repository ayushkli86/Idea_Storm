/**
 * Get current timestamp in milliseconds
 */
export function now(): number {
  return Date.now();
}

/**
 * Get current ISO timestamp
 */
export function nowISO(): string {
  return new Date().toISOString();
}

/**
 * Add minutes to timestamp
 */
export function addMinutes(timestamp: number, minutes: number): number {
  return timestamp + minutes * 60 * 1000;
}

/**
 * Add hours to timestamp
 */
export function addHours(timestamp: number, hours: number): number {
  return timestamp + hours * 60 * 60 * 1000;
}

/**
 * Add days to timestamp
 */
export function addDays(timestamp: number, days: number): number {
  return timestamp + days * 24 * 60 * 60 * 1000;
}

/**
 * Check if timestamp is expired
 */
export function isExpired(timestamp: number): boolean {
  return Date.now() > timestamp;
}

/**
 * Get time difference in minutes
 */
export function getMinutesDiff(timestamp1: number, timestamp2: number): number {
  return Math.abs(timestamp1 - timestamp2) / (60 * 1000);
}

/**
 * Format timestamp to readable string
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

/**
 * Parse date string to timestamp
 */
export function parseDate(dateString: string): number {
  return new Date(dateString).getTime();
}

/**
 * Get expiry time (current time + minutes)
 */
export function getExpiryTime(minutes: number): number {
  return addMinutes(now(), minutes);
}

/**
 * Check if date is in the future
 */
export function isFuture(timestamp: number): boolean {
  return timestamp > Date.now();
}

/**
 * Check if date is in the past
 */
export function isPast(timestamp: number): boolean {
  return timestamp < Date.now();
}
