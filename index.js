// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// const appSettings = {
//     databaseURL: "https://realtime-database-7bdf7-default-rtdb.firebaseio.com/"
// }

// const app = initializeApp(appSettings)
// const database = getDatabase(app)
// const shoppingListInDB = ref(database, "shoppingList")

// const inputFieldEl = document.getElementById("input-field")
// const addButtonEl = document.getElementById("add-button")
// const shoppingListEl = document.getElementById("shopping-list")


// addButtonEl.addEventListener("click", function() {
//     let inputValue = inputFieldEl.value
    
//     push(shoppingListInDB, inputValue)
    
//     clearInputFieldEl()
// })

// onValue(shoppingListInDB, function(snapshot){
//     let itemsArray = Object.values(snapshot.val())

//     clearShoppingListEl()

// their code

//     for (let i = 0; i < itemsArray.length; i++) {
//         let currentItem = itemsArray[i]
//         let currentItemID = currentItem[0]
//         let currentItemValue = currentItem[1]
        
//         appendItemToShoppingListEl(currentItem)
//     }
// my code
//     itemsArray.forEach(function(item){
//         let currentItem = item
//         let currentItemID = currentItem[0]
//         let currentItemValue = currentItem[1]

//     appendItemToShoppingListEl(item)
    
//     })
    
// })

// function clearShoppingListEl() {
//     shoppingListEl.innerHTML = ""
// }

// function clearInputFieldEl(){
//     inputFieldEl.value = ""
// }

// function appendItemToShoppingListEl(item){

//     console.log(item)
//     let itemId = item[0]
//     let itemValue = item[1]

//     console.log(itemValue)

//     let newEl = document.createElement('li')

//     newEl.textContent = itemValue

//     newEl.addEventListener('click', function(){
//         let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`)

        
//     })

//     shoppingListEl.append(newEl)
// }

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-7bdf7-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {

    if(snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val())
    
    clearShoppingListEl()

    itemsArray.forEach(function(item){
        let currentItem = item
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
    
    // for (let i = 0; i < itemsArray.length; i++) {
    //     let currentItem = itemsArray[i]
    //     let currentItemID = currentItem[0]
    //     let currentItemValue = currentItem[1]
        
        appendItemToShoppingListEl(currentItem)
    })
    } else {
        shoppingListEl.innerHTML = 'No items in here...yet.'
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    // Challenge: Attach an event listener to newEl and make it so you console log the id of the item when it's pressed.
    newEl.addEventListener("click", function() {
        // Challenge: Make a let variable called 'exactLocationOfItemInDB' and set it equal to ref(database, something) where you substitute something with the code that will give you the exact location of the item in question.
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
        
        // Challenge: Use the remove function to remove the item from the database
    })
    
    shoppingListEl.append(newEl)
}