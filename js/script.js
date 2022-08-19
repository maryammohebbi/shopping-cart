const cartBtn = document.querySelector(".cart-icon");
const backdrop = document.querySelector(".backdrop");
const cart = document.querySelector(".cart");

cartBtn.addEventListener("click", showCartModal);
backdrop.addEventListener("click", closeCartModal);

function showCartModal(){
    cart.style.top= "20%";
    cart.style.opacity= "1";
    backdrop.style.display= "block";

}

function closeCartModal(){
    cart.style.top= "-100%";
    cart.style.opacity= "0";
    backdrop.style.display= "none";
}