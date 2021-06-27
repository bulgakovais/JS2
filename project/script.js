const itemsCatalog = [
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

const renderFeaturedList = (list = itemsCatalog) => {
    let featuredList = list.map(item => renderFeaturedItem(item));
    document.querySelector('.featuredItems').innerHTML = featuredList.join('');
}

renderFeaturedList();

