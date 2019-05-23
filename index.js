const readline = require('readline'); //gets user input
const fetch = require('node-fetch'); //node implemenation of fetch()

//async function gets json promise object, and gets the view based on a selector
const returnSelectedView = async (selector) => {
  try {
    //returns a json promise object
    const response = await fetch('https://raw.githubusercontent.com/jdolan/quetoo/master/src/cgame/default/ui/settings/SystemViewController.json');
    const json = await response.json(); 
  
    // these are the views that will be returned
    const views = [];

    const getView = (subviews) => {
      //iterate through each subview in the subviews array . 
      subviews.forEach((subview) => {
        // check if it matches the selector
        if (subview.class === selector || subview.classNames === selector || subview.identifier === selector) {
        // if the subview matches the selector, push it to the views array  
        views.push(obj);
         //if there is child subview within the current subview object, recursively call getView() with the child subView object
         if (subview.subviews) {
          getView(subview.subviews);
        }
      }
      });
    }
    //runs getView for the first time
    getView(json.subviews);

    //returns the array of all views
    console.log(views);

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

