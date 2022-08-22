const cartBtn = document.querySelector(".cart-icon");
const backdrop = document.querySelector(".backdrop");
const myCart = document.querySelector(".cart");
const productsDOM = document.querySelector(".products-center");

const cart = [];

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
            const isInCart = cart.find(p => p.id === id);
            if (isInCart){
                btn.innerText = "In Cart";
                btn.disable = "true";
            }

            btn.addEventListener("click", (event) => {
                console.log(event.target.dataset.id);
            })
        })
    }
}

// 3. storage
class Storage {
   static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products))
    }
}




document.addEventListener("DOMContentLoaded", ()=>{
    const products = new Products();
    const productsData = products.getProduct();
    // console.log(productsData);
    const ui = new UI();
    ui.displayProducts(productsData);
    ui.getAddToCartBtns();
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