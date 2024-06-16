import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://cartapp-7f946-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    
    push(shoppingListInDB, inputValue);

    clearInputFieldEl();
})


onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
      let itemsArray = Object.entries(snapshot.val());

      clearShoppingListEl()
    
      for (let i = 0; i < itemsArray.length; i++) {
        let curentItem = itemsArray[i];
        let curentItemValue = curentItem[1];
        let curentItemId = curentItem[0];
    
        appendItemToCartEl(curentItem);
      }

    } else {
      shoppingListEl.textContent = "No items here...yet";
    }
});

// at this point, ts.constructor-error-msg, if last item reached,
// BUT: it will be deleted, only - you have to reload app to see.
function appendItemToCartEl(param) {
  let newEl = document.createElement("div");
  // div.class="";
  newEl.classList.add("shopping-list");
  
  let itemId = param[0];
  let itemValue = param[1];

  newEl.textContent = param[1];

  newEl.addEventListener("click", function() {
    // console.log(itemId)
    // ref() = location of item in database
    let exactLocOfItem = ref(database, `shoppingList/${itemId}`);
    
    remove(exactLocOfItem)
    
  })

  shoppingListEl.append(newEl);
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}