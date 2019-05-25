const readline = require('readline'); //gets user input
const fetch = require('node-fetch'); //node implemenation of fetch api

//async function gets json promise object, and gets the view based on a selector
const returnSelectedView = async (selector) => {
  try {
    //returns a json promise object
    const response = await fetch('https://raw.githubusercontent.com/jdolan/quetoo/master/src/cgame/default/ui/settings/SystemViewController.json');
    const json = await response.json(); 

    //initialize array of views that will be returned
    const views = [];

    //determine what type of selector the user wants
    let selectorType;
    if (selector[0] === '.') {
      selectorType = 'className';
    } else if (selector[0] === '#') {
      selectorType = 'identifier';
    } else {
      selectorType = 'class';
    }

    //selector logic - determines if the program will return subview based on the selector provided
    const selectSubView = (subview) => {
      switch (selectorType) {
        case 'class':
          if (subview.class && subview.class === selector) {
            views.push(subview);
          }
        break;
  
        case 'className': 
          if (subview.classNames && subview.classNames.includes(selector.slice(1))) {
            views.push(subview);
          }
        break;
  
        case 'identifier':
          if (subview.identifier && subview.identifier === selector.slice(1)) {
            views.push(subview);
          }
        break;
      }
    }
    
    const iterateViews = (currentView) => {
      if (currentView.subviews) {
        currentView.subviews.forEach(subview => {
          selectSubView(subview);
          iterateViews(subview);
        });
      }
    }

    //run getView for the first time with the JSON object
    iterateViews(json);

    //return the views to the user
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

