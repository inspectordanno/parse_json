const readline = require('readline'); //gets user input
const fetch = require('node-fetch'); //node implemenation of fetch()

//create io
readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

//async function that gets json
const getJson = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/jdolan/quetoo/master/src/cgame/default/ui/settings/SystemViewController.json');
    const json = await response.json(); 
    console.log(json);
    





  } catch (err) {
    console.log(err);
  }
}

getJson();


// readline.question(`What selector do you want?`, (selector) => {
//   readline.close()
// })

