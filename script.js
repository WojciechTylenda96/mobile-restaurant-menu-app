
import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid"

const menuEl = document.getElementById('menu');
const orderInfoSectionEl = document.getElementById('order-info-section')
const orderInfoEl = document.getElementById('order-info')

const orderItemsArr = []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addItem(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }
})

function addItem(itemId){
    const targetAddItemObj = menuArray.filter(item => item.id == itemId)[0]
    targetAddItemObj.uuid = uuidv4()
    orderItemsArr.push(targetAddItemObj)
    renderOrder()
}

function removeItem(itemUuid){
    const index = orderItemsArr.findIndex(dish => dish.uuid === itemUuid)

    if(index !== -1){
        orderItemsArr.splice(index, 1)
        console.log('dish deleted from order')
    }
    else { console.log('dish not found') }

    renderOrder()
}

function renderOrder(){
    const orderHtml = orderItemsArr.map(dish => {
        return `
        <div class="order-flex">
            <div class="order-cart-item-name">
                <h3>${dish.name}</h3>
                <button class="remove-btn" data-remove='${dish.uuid}'>remove</button>
            </div>
            <h3>$${dish.price}</h3>
        </div>`
    }).join('')

    orderInfoEl.innerHTML = orderHtml

    let totalPrice = 0
    for(let dish of orderItemsArr){
        totalPrice += dish.price
    }

    document.getElementById('total-price').innerText = '$' + totalPrice
    
    if(orderItemsArr.length > 0) {
        orderInfoSectionEl.style.visibility = 'visible'
    } 
    else { orderInfoSectionEl.style.visibility = 'hidden'}
}


function renderItems(){
    const menuHtml = menuArray.map(function(dish) {
        const ingredients = dish.ingredients.join(', ')
        return `
        <div class="menu-item">
        <div class="menu-item-info">
            <img src="${dish.img}" alt="pasta" class="menu-item-img">
            <div class="menu-item-desc">
                <h3>${dish.name}</h3>
                <p class="p-ingredients">${ingredients}</p>
                <h4>$${dish.price}</h4>
            </div>
        </div>    
            <button class="add-btn" data-add="${dish.id}">+</button>
        </div> 
        `
    })

    menuEl.innerHTML = menuHtml

}

renderItems()
