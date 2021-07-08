// API запрос

// function makeGETRequest(url, callback) {
//     let xhr = null;

//     if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//         xhr = new ActiveXObject('Microsoft.XMLHTTP');
//     }

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             callback(xhr.responseText);
//         }
//     }

//     xhr.open('GET', url, true);
//     xhr.send();
// }


const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
const basketTotalEl = document.querySelector('.basketTotal');

// Класс, принимающий единицу товара и составляющий разметку
class FeaturedItem {
    constructor(id_product, product_name, price, description) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.description = description;
    }
    render() {
        return `
        <div class="featuredItem">
    
            <div class="featuredImgWrap">
                <img src="images/featured/${this.id_product}.jpeg" alt="">
                    <div class="featuredImgDark">
                        <button data-productId=${this.id_product}>
                            <img src="images/cart.svg" alt="">
                                Add to Cart
                        </button>
                    </div>
                    </div>
    
                    <div class="featuredData">
                        <div class="featuredName">
                            ${this.product_name}
                        </div>
                        <div class="featuredText">
                            ${this.description}
                        </div>
                        <div class="featuredPrice">
                            ${this.price}
                        </div>
                    </div>
    
            </div>
        `;
    }
}

// API запрос через Рromise

// const makeGETRequest = (url, cb) => {
//     return new Promise((resolve, reject) => {
//         let xhr = null;
//         if (window.XMLHttpRequest) {
//             xhr = new XMLHttpRequest();
//         } else if (window.ActiveXObject) {
//             xhr = new ActiveXObject('Microsoft.XMLHTTP');
//         }
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status != 200) {
//                     reject('Error');
//                 }
//                 else {
//                     resolve(cb(xhr.responseText));
//                 }
//             }
//         };
//         xhr.send();
//     })
// }


// Класс, генерирующий список товаров
class FeaturedList {
    constructor() {
        this.items = [];
        this.fetchItems()
            .then((data) => {
                this.items = data;
                this.render();
                this.clickAddItemsToCart()
            })

    }
    // Метод отображения карточек товаров
    render() {
        let listHtml = '';
        this.items.forEach(item => {
            const fItem = new FeaturedItem(item.id_product, item.product_name, item.price, item.description);
            listHtml += fItem.render();
        });
        document.querySelector('.featuredItems').innerHTML = listHtml;
    }

    // Метод запрашивает у API данные по карточкам товара
    fetchItems() {
        return fetch(`${API_URL}/catalogData.json`)
            .then((response) => response.json())
            .catch((err) => console.log(err))
    }
    // Метод отслеживания события click на кнопке "Добавить товар"
    clickAddItemsToCart() {
        const addToCartBtns = document.querySelectorAll('button[data-productId]');
        addToCartBtns.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-productId')
                basket.addProductToObjectBasket(productId)
            })
        })
    }
}

// Класс создания карточки товара в корзине

class BasketItem extends FeaturedItem {
    constructor(id_product, product_name, price, quantity, totalPrice, image) {
        super(id_product, product_name, price);
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.image = image;
    }

    renderBasketItem() {
        return `
        <div class="basketRow">
            <div>${this.product_name}</div>
            <div>
                <span class="productQuantity" data-productId="${this.id_product}">${this.quantity} </span> шт.
            </div>
            <div>${this.price}$</div>
            <div>
                <span class="productTotalRow" data-productId="${this.id_product}">${this.price}$</span>
            </div>
           <div class ="buttonDelete"> <i class="fa fa-trash"  data-productId="${this.id_product}" aria-hidden="true"></i></div>
        </div>
    `;
    }
}

// КЛАСС КОРЗИНА. 

class Basket {
    constructor() {
        this.basketItems = [];
        this.getBasket()
            .then((data) => {
                this.basketItems = data;
                this.renderBasketList(this.basketItems)
                // this.addProductToObjectBasket()
                this.clickToButtonDeleteOfBasket()
            })

    }

    getBasket() {
        return fetch(`${API_URL}/getBasket.json`)
            .then(response => response.json())
            .catch((err) => console.log(err))
    }

    renderBasketList() {
        let basketList = '';
        this.basketItems.contents.forEach(basketItem => {
            const bItem = new BasketItem(basketItem.id_product, basketItem.product_name, basketItem.price, basketItem.quantity);
            basketList += bItem.renderBasketItem();
        });
        let basketTotal = document.querySelector('.basketTotal');
        basketTotal.insertAdjacentHTML('beforebegin', basketList)
    }

    // Метод Добавления в процессе доработки
    addProductToObjectBasket(productId) {
        this.basketItems.contents.find(element => {
            if (element.id_product == +productId) {
                element.quantity++

            } else {
                this.basketItems.contents.push(element.id_product[+productId])

            }
            basket.renderBasketList()
        })

    }

    //     function recalculateSumForProduct(productId) {
    //         const productTotalRowEl = document.querySelector(`.productTotalRow[data-productId="${productId}"]`);
    //         let totalPriceForRow = (basket[productId] * basketItem[productId].price).toFixed(2);
    //         productTotalRowEl.textContent = totalPriceForRow;
    //     }
    // }

    // addIntoBasket(productId) {
    //     fetch(`${API_URL}/addToBasket.json`)
    //         .then(response => response.json())
    //         .catch((err) => console.log(err))
    //         .then((response) => {
    //             if (response.result != 0) {
    //                 const itemIndex = this.basketItems.contents.findIndex(basketItem => basketItem.id_product === productId)
    //                 if (itemIndex > -1) {
    //                     this.basketItems.contents[itemIndex].quantity += 1;
    //                     this.basketItems.amount += this.basketItems.contents[itemIndex].price;
    //                     this.countGoods += 1;
    //                 }
    //             }
    //         })

    // }

    // Метод Удаления товара из корзины

    clickToButtonDeleteOfBasket() {
        const buttonsDelete = document.querySelectorAll('.buttonDelete')
        buttonsDelete.forEach(button => {
            button.addEventListener('click', (event) => {
                let deleteProductId = event.target.getAttribute('data-productId')
                button.parentNode.remove();
                basket.deleteBasketItems(deleteProductId)
            })

        })
    }

    deleteBasketItems(id) {

        return fetch(`${API_URL}/deleteFromBasket.json`)
            .then(response => response.json())
            .then((response) => {
                if (response.result !== 0) {
                    this.basketItems.contents.filter((basketItem) => basketItem.id_product != id)
                }
            })
            .catch((err) => console.log(err))
    }

}

const list = new FeaturedList();
list.fetchItems()
    .then(list.clickAddItemsToCart())

const basket = new Basket()
basket.getBasket()
    .then(list.clickAddItemsToCart())
// .then(basket.clickToButtonDeleteOfBasket())

basket.clickToButtonDeleteOfBasket()

// https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json
