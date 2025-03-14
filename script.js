
import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid"

const menuEl = document.getElementById('menu');
const orderInfoSectionEl = document.getElementById('order-info-section')
const orderInfoEl = document.getElementById('order-info')
const completeOrderBtn = document.getElementById('complete-order-btn')
const paymentPopUp = document.getElementById('payment-pop-up')
const closePopUpBtn = document.getElementById('pop-up-close-btn')
const submitBtnEl = document.getElementById('submit-btn')
const inputsForm = document.querySelectorAll('input')
const orderMessageEl = document.getElementById('order-message')
const inputNameEl = document.getElementById('input-name')


let orderItemsArr = []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addItem(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }
})

completeOrderBtn.addEventListener('click', () => {
    paymentPopUp.style.visibility = 'visible'
})

closePopUpBtn.addEventListener('click', () => {
    paymentPopUp.style.visibility = "hidden"
})

submitBtnEl.addEventListener('click', () => {
        const nameInput = document.getElementById('input-name')
        const inputCardNr = document.getElementById('input-card-nr')
        const inputCvv = document.getElementById('input-cvv')

        if( nameInput.value.trim() &&
            inputCardNr.value.length === 16 &&
            inputCvv.value.length === 3) {
                orderItemsArr = []
                renderOrder()
                orderInfoSectionEl.classList.add('hidden')
                paymentPopUp.style.visibility = "hidden"
                const message = `
                    <div class="order-message">
                    Thanks ${inputNameEl.value}! Your order is on its way!
                    </div>`
                orderMessageEl.innerHTML = message
            } else {
                alert('Please fill out all fields correctly.')
            }
        
        console.log(inputsForm.value)

        // dodać warunki, aby przycisk działaj tylko, gdy FORM jest wypełniony 

})

function addItem(itemId){
    const targetAddItemObj = menuArray.filter(item => item.id == itemId)[0]
    targetAddItemObj.uuid = uuidv4()
    orderItemsArr.push(targetAddItemObj)
    console.log('dish added')
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
        orderInfoSectionEl.classList.remove('hidden')
    } 
    else { orderInfoSectionEl.classList.add('hidden') }
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
