import { add } from '../src';

test("Add two numbers", () => {
  const result = add(2, 3);
  expect(result).toBe(5);
});