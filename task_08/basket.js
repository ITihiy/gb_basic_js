class BasketItem {
  constructor(id, name, price, count = 1) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.count = count;
  }
}

class Basket {
  constructor() {
    this.data = {};
    this.length = 0;
    this.updateCartIconQuantity()
  }
  updateCartIconQuantity() {
     totalItemsInCartElement.innerText = this.length;
  }

  addToBasket(item) {
    console.log('Added Called');
    if (!(item.id in this.data)) {
       this.data[item.id] = item;
    } else {
       this.data[item.id].count++;
    }
    this.length++;
    this.updateCartIconQuantity();
    console.log(item.count);
    this.insertHTMLToBasket(item);
  }
  insertHTMLToBasket(item) {
     const html = `
     <div class="basketRow">
        <div>${item.name}</div>
        <div>${item.count} шт.</div>
        <div>${item.price}</div>
     </div>
     `;
     basketTotalElement.insertAdjacentHTML('beforebegin', html);
  }
}

const basketTotalElement = document.querySelector('.basketTotal');
const basketElement = document.querySelector('.basket');
const featuredItemsElement = document.querySelector('.featuredItems');
const totalItemsInCartElement = document.querySelector('.cartIconWrapTotal');

featuredItemsElement.addEventListener('click', event => {
   if (!event.target.classList.contains('addToCart')) {
      return;
   }
   const currentItemElement = event.target.parentElement.parentElement.parentElement
     .querySelector('.featuredData');
   const current_id = currentItemElement.dataset.id
   const currentName = currentItemElement.querySelector('.featuredName').innerText;
   const currentPrice = Number.parseFloat(currentItemElement.querySelector('.featuredPrice').
   innerText.slice(1));
   globalBasket.addToBasket(new BasketItem(current_id, currentName, currentPrice));
});

document.querySelector('.cartIconWrap').addEventListener('click', () => {
   basketElement.classList.toggle('hidden');
});


const globalBasket = new Basket();
