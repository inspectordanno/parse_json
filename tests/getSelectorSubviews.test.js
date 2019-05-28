import { getJSON, getSelectorSubviews } from '../index';

const fixture = 'https://raw.githubusercontent.com/inspectordanno/parse_json/master/tests/fixture.json';

it('should detect two views with a class of Input', async () => {
  const json = await getJSON(fixture);
  const views = getSelectorSubviews('Input', 'class', json);
  views.forEach(view => expect(view).toHaveProperty('class', 'Input'));
  expect(views).toHaveLength(2);
});

it('should detect three views with a className of container', async () => {
  const json = await getJSON(fixture);
  const views = getSelectorSubviews('.container', 'className', json);
  views.forEach(view => expect(view.classNames).toContain('container'));
  expect(views).toHaveLength(3);
});

it('should detect one view with an identifier of videoMode', async () => {
  const json = await getJSON(fixture);
  const views = getSelectorSubviews('#videoMode', 'identifier', json);
  views.forEach(view => expect(view).toHaveProperty('identifier', 'videoMode'));
  expect(views).toHaveLength(1);
});

