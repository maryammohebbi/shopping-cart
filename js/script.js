const cartBtn = document.querySelector(".cart-icon");
const backdrop = document.querySelector(".backdrop");
const myCart = document.querySelector(".cart");
const productsDOM = document.querySelector(".products-center");

const cartTotal = document.querySelector(".cart-total");
const cartItems = document.querySelector(".cart-items");

const cartContent = document.querySelector(".cart-content");

const cartClear = document.querySelector(".clear-cart");

let cart = [];

import {productsData} from "./products.js";

// 1. get products
class Products {
    getProduct (){
        return productsData;
    }
}

// 2. display products
class UI {
    displayProducts(products){
        let result ="";
        products.forEach(item => {
            result += `<section class="product">
                        <div class="img-container">
                        <img class="product-img" src= ${item.imageUrl} alt="product 1">
                        </div>
                        <div class="products-desc">
                            <p class="product-title">${item.title}</p>
                            <p class="product-price">${item.price} $</p>
                        </div>
                        <button class="add-to-cart" data-id=${item.id}>
                            <i class="fa-solid fa-cart-arrow-down"></i>
                            add to cart
                        </button>
                    </section>`
                    productsDOM.innerHTML = result;
        });
    }
    getAddToCartBtns(){
        const addToCartBtns = document.querySelectorAll(".add-to-cart");
        // console.log(addToCartBtns);
        const buttons = [...addToCartBtns];
        // console.log(buttons);
        buttons.forEach(btn => {
            const id = btn.dataset.id;
            // console.log(id)
            // check if this product id is in cart or not:
            const isInCart = cart.find(p => p.id === parseInt(id));
            if (isInCart){
                btn.innerText = "In Cart";
                btn.disable = "true";
            }

            btn.addEventListener("click", (event) => {
                // console.log(event.target.dataset.id);
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                // get product from products:
                const addedProduct = {...Storage.getProduct(id), quantity: 1}; // check kardim ke che producti hast
                // add to cart:
                cart = [...cart, addedProduct]; // sabad kharid ro update kardim
                //save cart to local storage:
                Storage.saveCart(cart); // sababd kharid ro save kardim
                // update cart value:
                this.setCartValue(cart);
                //add to cart items:
                this.addCartItem(addedProduct);
                //get cart from storage:
            })

        })
    }

    setCartValue(cart){
        // 1. cart items:
        // 2. cart total price:
        let tempCartItems = 0;
        const totalPrice = cart.reduce((acc, curr)=>{
            tempCartItems += curr.quantity;
            return acc + curr.quantity * curr.price;
        }, 0);
        cartTotal.innerText = `Total Price: ${totalPrice.toFixed(2)} $ `;
        cartItems.innerText = tempCartItems;
    }

    addCartItem(cartItem){
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
        <img src=${cartItem.imageUrl} alt="product 1">
        <div class="cart-item-desc">
            <h4>${cartItem.title}</h4>
            <h5>${cartItem.price} $</h5>
        </div>

        <div class="cart-item-controler">
            <i class="fa-solid fa-chevron-up"></i>
            <p>${cartItem.quantity}</p>
            <i class="fa-solid fa-chevron-down"></i>
        </div>

        <div class="cart-item-delete">
            <i class="fa-solid fa-trash"></i>
        </div>`;
        cartContent.appendChild(div);
    }

    setupApp(){
        //1. get cart from storage:
        cart = Storage.getCart() || [];
        //2. addCartItem
        cart.forEach(cartItem => this.addCartItem(cartItem))
        // 3. set values: price + items
        this.setCartValue(cart);
    }

    cartLogic(){
        cartClear.addEventListener("click", ()=>{
            // remove: DRY =>
            cart.forEach((cItem) => this.removeItem(cItem.id));
        })
    }

    removeItem(id){
        // update cart
        cart = cart.filter((cItem) => cItem.id !== id);
        // total price and cart items update
        this.setCartValue(cart);
        //update storage
        Storage.saveCart(cart);
    }
}

// 3. storage
class Storage {
   static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products))
    }

    static getProduct(id){
        const _products = JSON.parse(localStorage.getItem("products"));
        return _products.find(p => p.id === parseInt(id));
    }

    static saveCart(cart){
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart(){
        return JSON.parse(localStorage.getItem("cart"));
        
    }
}




document.addEventListener("DOMContentLoaded", ()=>{
    // setup: get cart and set up app: 
    const products = new Products();
    const productsData = products.getProduct();
    // console.log(productsData);
    const ui = new UI();
    ui.setupApp();
    ui.displayProducts(productsData);
    ui.getAddToCartBtns();
    ui.cartLogic();
    Storage.saveProducts(productsData);

})

cartBtn.addEventListener("click", showCartModal);
backdrop.addEventListener("click", closeCartModal);

function showCartModal(){
    myCart.style.top= "20%";
    myCart.style.opacity= "1";
    backdrop.style.display= "block";

}

function closeCartModal(){
    myCart.style.top= "-100%";
    myCart.style.opacity= "0";
    backdrop.style.display= "none";
}