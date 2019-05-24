const readline = require('readline'); //gets user input
const fetch = require('node-fetch'); //node implemenation of fetch()

//async function gets json promise object, and gets the view based on a selector
const returnSelectedView = async (selector) => {
  try {

    //this function is responsible for recursing down the tree and returning the views
    const getView = (subviews) => {
      // these are the views that will be returned
      const views = [];
      //iterate through each subview in the subviews array . 
      subviews.forEach((subview) => {
        // check if it matches the selector
        if (subview.class === selector || subview.classNames === selector || subview.identifier === selector) {
        // if the subview matches the selector, push it to the views array  
        views.push(subview);
         //if there is child subview within the current subview object, recursively call getView() with the child subView object
         if (subview.subviews) {
          getView(subview.subviews);
        }
      }
        return views;
      });
    }

    //returns a json promise object
    const response = await fetch('https://raw.githubusercontent.com/jdolan/quetoo/master/src/cgame/default/ui/settings/SystemViewController.json');
    const json = await response.json(); 
    //runs getView for the first time
    await getView(json.subviews);

  } catch (err) {
    console.log(err);
  }
}

returnSelectedView('StackView');

// //create io
// const io = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// //ask for input selector and execute returnSelectedView() based on the selector provided
// io.question(`What selector do you want?`, (selector) => {
//   returnSelectedView(selector);
//   io.close()
// })

