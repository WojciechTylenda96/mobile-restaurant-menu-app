
import { menuArray } from "./data.js";

const menuEl = document.getElementById('menu');
const orderInfoSectionEl = document.getElementById('order-info-section')
const orderInfoEl = document.getElementById('order-info')

const orderItemsArr = []

document.addEventListener('click', function(e){
    if(e.target.dataset.id){
        addItem(e.target.dataset.id)
    }
})

function addItem(itemId){
    const targetAddItemObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    orderItemsArr.push(targetAddItemObj)
    console.log(orderItemsArr)
    renderOrder()
}

function renderOrder(){
    const orderHtml = orderItemsArr.map(function(dish){
        return `
        <div class="order-flex">
            <div class="order-cart-item-name">
                <h3>${dish.name}</h3>
                <button class="remove-btn">remove</button>
            </div>
            <h3>$${dish.price}</h3>
        </div>`
    })

    orderInfoEl.innerHTML = orderHtml
    
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
            <button class="add-btn" data-id="${dish.id}">+</button>
        </div> 
        `
    })

    menuEl.innerHTML = menuHtml

}

renderItems()
