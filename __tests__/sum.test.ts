// https://jestjs.io/pt-BR/docs/getting-started

const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});