import { getSelectorType } from '../index';

test('should return className selector type', () => {
  const classSelector = getSelectorType('.');
  expect(classSelector).toBe('className');
});

test('should return identifier selector type', () => {
  const identifierSelector = getSelectorType('#');
  expect(identifierSelector).toBe('identifier');
});

test('should return class selector type', () => {
  const classSelector = getSelectorType('S');
  expect(classSelector).toBe('class');
});