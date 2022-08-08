const shop = document.getElementById('shop')


let basket = JSON.parse(localStorage.getItem("data")) || new Array();


const generateItem = () => {
    return (shop.innerHTML = shopItemData.map((x) => {
        let { id, name, price, desc, img } = x
        let search = basket.find((x) => x.id === id) || [];
        return `<article id="product-id-${id}" class="item">
        <img width="219" src=${img} alt="article 1">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash"></i>
                    <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item }</div>
                    <i onclick='increment(${id})' class="bi bi-plus"></i>
                </div>
            </div>
        </div>
    </article>`
    }).join(""))
};

generateItem()

// increment, decrements and update functions

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    search === undefined ? basket.push({ id: selectedItem.id, item: 1 }) : search.item++;
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
}
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) { return } else if (search.item === 0) { return } else { search.item-- };
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation(id);
}

// calculation total function

let calculation = (x) => {
    const cartAmount = document.getElementById('cartAmount')
    cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation()