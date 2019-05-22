const readline = require('readline'); //gets user input
const fetch = require('node-fetch'); //node implemenation of fetch()

//async function gets json promise object, and gets the view based on a selector
const returnSelectedView = async (selector) => {
  try {
    //returns a json promise object
    const response = await fetch('https://raw.githubusercontent.com/jdolan/quetoo/master/src/cgame/default/ui/settings/SystemViewController.json');
    const json = await response.json(); 
  
    //these are the views that will be returned
    const views = [];

    const getView = (obj) => {
      //for each view in the object, check if it matches the selector. if it does, push it to the views array
      obj.subviews.forEach(() => {
        if (obj['class'] === selector || obj['classNames'] === selector || obj['identifier'] === selector) {
        views.push(obj);
      }
        //if there is child subview within the current subview object, recursively call getView() with the child subView object
        if (obj.subviews) {
          getView(obj.subviews);
        }
      });
    }
    //runs getView for the first time
    getView(json);

    //returns the array of all views
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
  io.close()
})

