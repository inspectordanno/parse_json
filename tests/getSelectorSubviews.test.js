import { getJSON, getSelectorSubviews } from '../index';

const fixture = 'https://raw.githubusercontent.com/inspectordanno/parse_json/master/tests/fixture.json';

it('should return two views with a class of Input', async () => {
  const json = await getJSON(fixture);
  const views = getSelectorSubviews('Input', 'class', json);
  expect(views).toHaveLength(2);
});

it('should return three views with a className of container', async () => {
  const json = await getJSON(fixture);
  const views = getSelectorSubviews('.container', 'className', json);
  expect(views).toHaveLength(3);
});

it('should return one view with an identifier of videoMode', async () => {
  const json = await getJSON(fixture);
  const views = getSelectorSubviews('#videoMode', 'identifier', json);
  expect(views).toHaveLength(1);
});

