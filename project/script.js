/*const items = [
    { id: 0, name: 'Mango People T-shirt', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', price: '$52.00' },
    { id: 1, name: 'Mango People T-shirt', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', price: '$52.00' },
    { id: 2, name: 'Mango People T-shirt', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', price: '$52.00' },
    { id: 3, name: 'Mango People T-shirt', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', price: '$52.00' },
    { id: 4, name: 'Mango People T-shirt', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', price: '$52.00' },
    { id: 5, name: 'Mango People T-shirt', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', price: '$52.00' },

];


const renderFeaturedItem = (item) => {
    return `
    <div class="featuredItem">

        <div class="featuredImgWrap">
            <img src="images/featured/${item.id}.jpg" alt="">
                <div class="featuredImgDark">
                    <button data-productId="images/cart.png">
                        <img src="images/cart.svg" alt="">
                            Add to Cart
                    </button>
                </div>
                </div>

                <div class="featuredData">
                    <div class="featuredName">
                        ${item.name}
                    </div>
                    <div class="featuredText">
                        ${item.description}
                    </div>
                    <div class="featuredPrice">
                        ${item.price}
                    </div>
                </div>

        </div>
    `;
};

const renderFeaturedList = (list = items) => {
    let featuredList = list.map(item => renderFeaturedItem(item));
    document.querySelector('.featuredItems').innerHTML = featuredList.join('');
}

renderFeaturedList();

*/

const basketTotalEl = document.querySelector('.basketTotal');

// Класс, принимающий единицу товара и составляющий разметку
class FeaturedItem {
    constructor(id, title, description, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
    }
    render() {
        return `
        <div class="featuredItem">
    
            <div class="featuredImgWrap">
                <img src="images/featured/${this.id}.jpg" alt="">
                    <div class="featuredImgDark">
                        <button data-productId="images/cart.png">
                            <img src="images/cart.svg" alt="">
                                Add to Cart
                        </button>
                    </div>
                    </div>
    
                    <div class="featuredData">
                        <div class="featuredName">
                            ${this.title}
                        </div>
                        <div class="featuredText">
                            ${this.description}
                        </div>
                        <div class="featuredPrice">
                            ${this.price}$
                        </div>
                    </div>
    
            </div>
        `;
    }
}

// Класс, генерирующий список товаров

class FeaturedList {
    constructor() {
        this.items = [];
    }
    fetchItems() {
        this.items = [
            { id: 0, title: 'Mango People T-shirt', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', price: 52.01 },
            { id: 1, title: 'Mango People T-shirt', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', price: 52.01 },
            { id: 2, title: 'Mango People T-shirt', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', price: 52.01 },
            { id: 3, title: 'Mango People T-shirt', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', price: 52.01 },
            { id: 4, title: 'Mango People T-shirt', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', price: 52.01 },
            { id: 5, title: 'Mango People T-shirt', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', price: 52.01 },

        ];
    }
    render() {
        let listHtml = '';
        this.items.forEach(item => {
            const fItem = new FeaturedItem(item.id, item.title, item.description, item.price);
            listHtml += fItem.render();
        });
        document.querySelector('.featuredItems').innerHTML = listHtml;
    }

    // Высчитывается сумма всех товаров и выводится в корзину
    sumPriceItems() {
        let sumPrice = null;
        this.items.forEach(item => {
            sumPrice += item.price;
        })

        // Не разобралась с методом, в первой итерации считает правильно,
        //   а потом sum = undefined
        // sumPrice = this.items.reduce((sum, item) => {
        //     sum.price += item.price
        // })

        document.querySelector('.basketTotalValue').innerHTML = sumPrice.toFixed(2)
    }
}
const list = new FeaturedList();
list.fetchItems();
list.render();
list.sumPriceItems()


// Класс создания карточки товара в корзине

class BasketItem extends FeaturedItem {
    constructor(id, title, price, count, totalPrice) {
        super(id, title, price);
        this.count = count;
        this.totalPrice = totalPrice;
    }

    renderBasketItem() {
        return `
        <div class="basketRow">
            <div>${this.title}</div>
            <div>
                <span class="productCount" data-productId="${this.id}">1</span> шт.
            </div>
            <div>$${this.price}</div>
            <div>
                $<span class="productTotalRow" data-productId="${this.id}">${items[this.id].price}</span>
            </div>
        </div>
    `;
    }

    addBasketItem() {

    }

    deleteBasketItem() {

    }
}

// Класс, генерирующий список товаров в корзине. 
class Basketlist {
    constructor() {
        this.basketItems = []
    }
    renderBasketList() {
        let basketList = '';
        this.basketItems.forEach(basketItem => {
            const bItem = new BasketItem(basketItem.id, basketItem.title, basketItem.description, basketItem.price);
            basketList += bItem.renderBasketItem();
        });
        let basketTotal = document.querySelector('.basketTotal');
        basketTotal.insertAdjacentHTML('beforebegin', basketlist)
    }
}