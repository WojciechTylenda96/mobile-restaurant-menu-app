
import { menuArray } from "./data.js";

const menuEl = document.getElementById('menu');

function render(){
    // let menuHtml = ''

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
            <button class="add-btn">+</button>
        </div> 
        `
    })

    menuEl.innerHTML = menuHtml

}

render()


{/* 
    <div class="menu-item">
        <img src="IMAGE" alt="pasta" class="menu-item-img">
        <div class="menu-item-desc">
            <h3>DISH's NAME</h3>
            <p>INGREDIENTS</p>
            <h4>PRICE</h4>
        </div>
            <button class="add-btn">+</button>
        </div> 
*/}