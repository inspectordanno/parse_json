import { getSelectorType } from '../index';

//these tests confirm that the getSelectorType() helper function is mapping user input to the selectors in the object

test('should return className selector type', () => {
  const classNameSelector = getSelectorType('.');
  expect(classNameSelector).toBe('className');
});

test('should return identifier selector type', () => {
  const identifierSelector = getSelectorType('#');
  expect(identifierSelector).toBe('identifier');
});

test('should return class selector type', () => {
  const classSelector = getSelectorType('S');
  expect(classSelector).toBe('class');
});