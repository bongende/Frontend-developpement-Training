let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")
    // console.log(shopItemData)

let basket = JSON.parse(localStorage.getItem("data")) || new Array();
// console.log(basket)

let calculation = () => {
    let count = document.getElementById('cartAmount')
    count.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation()

let generateCartItems = () => {
    if (basket.length !== 0) {

        return (shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x
            let search = shopItemData.find((y) => y.id === id) || []
            let { img, name, price } = search
            return `
            <h2></h2>
            <div class='cart-item'>
                <img width='100' src=${img} >
                <div class='details'>
                    <div class="title-price-x">
                        <h4>
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x"></i>
                        </div>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick='increment(${id})' class="bi bi-plus"></i>
                        </div>
                    <h3>$ ${search.price * item}</h3>
                </div>
            </div>
            `
        }).join(""))
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href='index.html'><button class="home-btn" > Back to home </button></a>
        `
    }
}

generateCartItems()
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    search === undefined ? basket.push({ id: selectedItem.id, item: 1 }) : search.item++;
    update(selectedItem.id);
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket));
}
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) { return } else if (search.item === 0) { return } else { search.item-- };
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket));
}
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation(id);
    totalAmount()
}

let removeItem = (id) => {
    let selectedItem = id
    basket = basket.filter((x) => x.id !== selectedItem.id)
    generateCartItems()
    totalAmount()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket));
}

let clearAllItems = () => {
    basket = []
    generateCartItems()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { id, item } = x
            let search = shopItemData.find((y) => y.id === id) || []
            return search.price * item
        }).reduce((x, y) => x + y, 0)

        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <div>
            <a href="index.html" ><button class="checkout">Checkout</button></a>
            <button class="clear-all" onclick="clearAllItems()" >Clear Cart</button>
        </div>
        `
    } else { return }
}

totalAmount()