import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"       //(1)
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"   //(3) (5_ref) (7_push) (9_onValue) (12_remove)

const appSettings = {                                                                            //(0)
    databaseURL: "https://playground-3a68c-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSettings)                  //(2)
const database = getDatabase(app)                       //(4)
const shoppingListInDb = ref(database, "ShoppingList")   //(6)

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(shoppingListInDb, inputValue)                  //(8)

    clearInputFieldEl()


})

onValue(shoppingListInDb, function (snapshot) {          //(10)
    if (snapshot.exists()) {                             //(14) exists() - inbuilt fuction to check something is in firebase or not[here checking snapshot has data or not]
        let itemsArray = Object.entries(snapshot.val())      //(11)

        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]

            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            addItemsToShoppingListEl(currentItem)

        }
    } else {
        shoppingListEl.innerHTML = "No Items Yet..."
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function addItemsToShoppingListEl(item) {

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let ecactLocationOfItemInDB = ref(database, `ShoppingList/${itemID}`)

        remove(ecactLocationOfItemInDB)                     //(13)
    })

    shoppingListEl.append(newEl)
}
