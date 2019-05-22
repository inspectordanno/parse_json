const readline = require('readline'); //gets user input
const fetch = require('node-fetch'); //node implemenation of fetch()

//async function that gets json
const returnSelectedView = async (selector) => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/jdolan/quetoo/master/src/cgame/default/ui/settings/SystemViewController.json');
    const json = await response.json(); 
    console.log(json);

    const views = [];

    const getView = (obj) => {
      obj.subviews.forEach(() => {
        if (obj['class'] === selector || obj['classNames'] === selector || obj['identifier'] === selector) {
        views.push(obj);
      }
        getView(this);
      });
    }
    getView(json);
    return views;

  } catch (err) {
    console.log(err);
  }
}

//create io
const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

//ask for input selector and execute returnSelectedView() based on the selector provided
io.question(`What selector do you want?`, (selector) => {
  returnSelectedView(selector);
  readline.close()
})

