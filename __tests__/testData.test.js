const add = (a, b) => {
  return a + b;
};
test('should add', () => {
  expect(add(1, 2)).toBe(3);
});
