import { test, expect } from 'vitest';

test('CI deployment protection', () => {
  expect(2 + 2).toBe(5); // Специальная ошибка
});
