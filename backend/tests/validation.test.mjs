
import { test, expect } from 'vitest';
import validation from '../src/middleware/validate.js';

const { BookingSchema } = validation;

test('Valid booking data is accepted', () => {
  const result = BookingSchema.safeParse({
    expeditionId: 'expedition-1',
    package: 'BASIC',
    fullName: 'Test User',
    email: 'test@example.com',
  });

  expect(result.success).toBe(true);
});
