const readline = require('readline'); //gets user input
const fetch = require('node-fetch'); //node implemenation of fetch api

//this is an async function that returns a json promise object
export const getJSON = async (jsonURL) => {
  try {
    const apiResponse = await fetch(jsonURL);
    return apiResponse.json();
  } catch (err) {
    console.log(err);
  }
}

//determines the type of selector provided based on the user input
export const getSelectorType = (selector) => {
  if (selector[0] === '.') {
    return 'className';
  } else if (selector[0] === '#') {
    return 'identifier';
  } else {
    return 'class';
  }
}

export const getSelectorSubviews = (selector, selectorType, json) => {
  //initialize array of views that will be returned
  let views = [];

  //selector logic - determines if the program will return subview based on the selectorType
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

    //control object, determines if the program will push a control object to the views array
    const selectControl = (currentView) => {
      //if the current view has a control object, determine if it matches the selector and then push the object to the array 
      if (currentView.control) {
        if (selectorType === 'class' && currentView.control.class === selector.slice(1)) {
          views.push(currentView.control);
        } else if (selectorType === 'identifier' && currentView.control.identifier === selector.slice(1)) {
          views.push(currentView.control);
        }
      }
    }

    selectControl(currentView);

    //if the current view has a subViews array, for each subview, select the subviews and push them to the array, and recursively call iterateReviews() down the tree
    if (currentView.subviews) {
      currentView.subviews.forEach(subview => {
        selectSubView(subview);
        iterateViews(subview);
      });
    }

    //if the current view has a contentView array, iterate among the subviews
    if (currentView.contentView) {
      currentView.contentView.subviews.forEach(subview => {
        selectSubView(subview);
        iterateViews(subview);
      });
    }
  }

  // initial function call to recrusively traverse the JSON object
  iterateViews(json);

  //return the views that match the selector
  return views;
}

//create io
const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const main = () => {
  //asks for input selector
  io.question(`Type in a selector to return the corresponding view. `, async (selector) => {
    const json = await getJSON('https://raw.githubusercontent.com/jdolan/quetoo/master/src/cgame/default/ui/settings/SystemViewController.json'); //gets json promise object
    const selectorType = getSelectorType(selector); //determines the selector type
    const subviews = getSelectorSubviews(selector, selectorType, json); //gets the subviews
    console.log(subviews); //logs the subviews to the screen
    console.log(`There are ${subviews.length} subviews associated with the ${selector} selector.`);
    io.close();
  });
};

main();