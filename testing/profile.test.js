const tests = require('../server/parse/profile.js');

test('test to see if user is 18 years old or older.', () => {
  expect(tests.age({year:1989, month:1, day: 1})).toBe(true);
  expect(tests.age({year:2014, month:1, day: 1})).toBe(false);
})
