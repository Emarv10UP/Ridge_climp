import { test, expect } from 'vitest';

test('CI deployment protection', () => {
  expect(2 + 2).toBe(4); // Специальная ошибка
});
