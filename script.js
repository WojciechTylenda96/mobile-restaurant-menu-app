
import { menuArray } from "./data.js";

const menuEl = document.getElementById('menu');
const orderInfoEl = document.getElementById('order-info')

const orderItemsArr = []

document.addEventListener('click', function(e){
    if(e.target.dataset.id){
        addItem(e.target.dataset.id)
    }
})

function addItem(id){
    const targetAddItemObj = menuArray.filter(function(item){
        return item.id === id
    })
    console.log(targetAddItemObj)
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
