/**
 * Converts a monetary value to cents.
 * @param value The monetary value to convert
 * @returns The value in cents as an integer
 * @throws Error if the input is invalid
 */
export const convertToCents = (value: number): number => {
  // Check if value is a valid number
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error('Invalid value: must be a number');
  }

  // Check for infinity
  if (!Number.isFinite(value)) {
    if (value > 0) {
      throw new Error('Value is too large');
    } else {
      throw new Error('Value is too small');
    }
  }

  // Handle zero case
  if (value === 0) {
    return 0;
  }

  // Limit precision to avoid floating point issues
  // First multiply by 100 to convert to cents
  // Then round to nearest integer to ensure proper conversion
  const cents = Math.round(value * 100);

  // Ensure the result is within safe integer range
  if (!Number.isSafeInteger(cents)) {
    throw new Error('Resulting cents value exceeds safe integer bounds');
  }

  return cents;
};
