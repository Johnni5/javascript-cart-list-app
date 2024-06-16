import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';

import {
  getDatabase,
  ref,
  push,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const SENDER_ID = 766654133813;

// function addToCart() {
//   const userInput = document.getElementById('input-field').value;

//   push(itemInCartDb, userInput);

//   const output = document.getElementById('output');
//   output.innerHTML = userInput;

//   userInput.value = '';
// }

// const projectId = 'cartapp-7f946';

const appSettings = {
  databaseUrl:
    'https://cartapp-7f946-default-rtdb.firebaseio.com/',
  projectId: 'cartapp-7f946',
  messagingSenderId: SENDER_ID,
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemInCartDb = ref(database, "items");

const inputFieldEl = document.getElementById('input-field');
const outputEl = document.getElementById('output');
const addButtonEl = document.getElementById('add-button');

addButtonEl.addEventListener('click', function() {
  let userInput = inputFieldEl.value;
  const newItemRef = push(itemInCartDb, userInput);
  outputEl.innerHTML += userInput;
  inputFieldEl.value = '';
  console.log(newItemRef);
  console.log(userInput);
  console.log(itemInCartDb);
})