import { getJSON, getSelectorSubviews } from '../index';

//fixture that is a simple approximation of the target json file
const fixture = 'https://raw.githubusercontent.com/inspectordanno/parse_json/master/tests/fixture.json';

//these tests test the getJSON() fetch and getSelectorSubviews() functions.

it('should detect two views with a class of Input', async () => {
  const json = await getJSON(fixture);
  const views = getSelectorSubviews('Input', 'class', json);
  views.forEach(view => expect(view).toHaveProperty('class', 'Input')); //expect the views to have the properties denoted 
  expect(views).toHaveLength(2); //there are 2 views with these properties in the fixture
});

it('should detect three views with a className of container', async () => {
  const json = await getJSON(fixture);
  const views = getSelectorSubviews('.container', 'className', json);
  views.forEach(view => expect(view.classNames).toContain('container')); //expect the className array to contain the selector
  expect(views).toHaveLength(3);
});

it('should detect one view with an identifier of videoMode', async () => {
  const json = await getJSON(fixture);
  const views = getSelectorSubviews('#videoMode', 'identifier', json);
  views.forEach(view => expect(view).toHaveProperty('identifier', 'videoMode'));
  expect(views).toHaveLength(1);
});

