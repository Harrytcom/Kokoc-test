// URL: https://dev.mykgproxy.webprofy.ru/upload/frontend/data.json
// Method: POST
// contentType: "application/x-www-form-urlencoded"

const getNews = () => {
  fetch('https://dev.mykgproxy.webprofy.ru/upload/frontend/data.json')
  
    .then((res) => res.json())
    .then((res) => {
      res.forEach((news) => {
        const newsItem = new Card(news);
        const newsElement = newsItem.generateCard();
        newsContainer.prepend(newsElement);
        console.log(news);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getNews()

const newsContainer = document.querySelector('.news-grid-wrapper');
class Card {
  constructor(newsContent) {
    this._newsContent = newsContent;
    this._cardSelector = '#news__card-js';
    this._author = newsContent.author;
    this._date = newsContent.date;
    this._id = newsContent.id;
    this._imgUrl = newsContent.imgUrl;
    this._name = newsContent.name;
    this._text = newsContent.text;
    this._voteStatus = newsContent.voteStatus;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('#news__item-js')
      .cloneNode(true);
  }

  generateCard() {
    this._newsContent = this._getTemplate();
    this._newsContent.querySelector('.news__title').textContent = this._name;
    this._newsContent.querySelector('.news__date').textContent = this._date;
    this._newsContent.querySelector('.news__author').textContent = this._author;
    this._newsContent.querySelector('.news__preview').textContent = this._text;
    this._newsContent.querySelector('.news__image').src = this._imgUrl;
    this._newsContent.querySelector('.news__image').alt = `На фото ` + `${this._name}`;

    return this._newsContent;
  }
}

// const getFetchProducts = () => {
//   fetch('products.json')
//     .then((response) => response.json())
//     .then((res) => {
//       res.forEach((card) => {
//         const productCard = new Card(card);
//         const cardElement = productCard.generateCard();
//         cardsContainer.prepend(cardElement);
//         console.log('Выполнено');
//       });
//     })
//     .catch((err) => {
//       console.log('Ошибка. Запрос не выполнен');
//     });
// };

// getFetchProducts();
// const cardsContainer = document.querySelector('.product__area');

// Карточка с товаром
// class Card {
//   constructor(cardItem) {
//     this._cardItem = cardItem;
//     this._cardSelector = '#product-card';
//     this._productId = cardItem.productId;
//     this._code = cardItem.code;
//     this._title = cardItem.title;
//     this._primaryImageUrl = cardItem.primaryImageUrl;
//     this._assocProducts = cardItem.assocProducts;
//     this._priceRetail = cardItem.priceRetail;
//     this._priceRetailAlt = cardItem.priceRetailAlt;
//     this._priceGold = cardItem.priceGold;
//     this._priceGoldAlt = cardItem.priceGoldAlt;
//     this._bonusAmount = cardItem.bonusAmount;
//     this.quantity = 0;
//     this._currentPriceGold = this._priceGold;
//     this._currentPriceRetail = this._priceRetail;
//   }

//   _getTemplate = () => {
//     return document
//       .querySelector(this._cardSelector)
//       .content.querySelector('#products_section')
//       .cloneNode(true);
//   };

//   // Количество бонусных баллов (~60% полной цены)
//   _bonusGambler = () => {
//     return (Math.floor(Math.random() * (this._priceRetail - this._priceGold)) + Math.floor(this._priceGold * .6));
//   };

//   // Генерация карточки
//   generateCard = () => {
//     this._cardItem = this._getTemplate();
//     this._cardItem.querySelector('.btn_cart').setAttribute('data-product-id', this._productId); // 1.	У кнопки «Купить» должен быть атрибут «data-product-id» с уникальным «id» товара
//     this._cardItem.querySelector('.product_code').textContent = this._code;
//     this._cardItem.querySelector('.product_description .product__link').textContent = this._title;
//     this._cardItem.querySelector('.goldPrice').textContent = `${Math.floor(this._priceGoldAlt)},00`;
//     this._cardItem.querySelector('.retailPrice').textContent = `${Math.floor(this._priceRetailAlt)},00`;
//     this._cardItem.querySelector('.product_price_points .ng-binding').textContent = `${'Можно купить за '} ${this._bonusGambler()} балла`;

//     // Добавляет модификатор '_220x220_1' к изображению товара
//     if (typeof this._primaryImageUrl === 'string') {
//       const [path, format] = this._primaryImageUrl.split(/\.(?=[^\.]+$)/);
//       const url = `${path}_220x220_1.${format}`;
//       this._cardItem.querySelector('.product_photo .product__link .product__link-img').src = url;
//     }

//     this._addLinks();
//     this._updateCounter();
//     this._setEventListeners();

//     return this._cardItem;
//   };

//   // Добавляет сопутствующие товары
//   _addLinks() {
//     const productTags = this._cardItem.querySelector('.product_tags');
//     const listTextLinks = this._assocProducts.split(';');
//     listTextLinks.forEach((text) => {
//       const link = this._createLink(text);
//       productTags.insertAdjacentElement('beforeend', link);
//     });
//   }

//   _createLink(text) {
//     const link = document.createElement('a');
//     link.href = '#';
//     link.textContent = text;
//     link.classList.add('url--link');

//     return link;
//   }

//   _setEventListeners() {
//     this._cardItem.querySelector('.btn_cart').addEventListener('click', () => this._quantityCounterUp());
//     this._cardItem.querySelector('.up').addEventListener('click', () => this._quantityCounterUp());
//     this._cardItem.querySelector('.down').addEventListener('click', () => this._quantityCounterDown());
//     const selectBtns = this._cardItem.querySelectorAll('.unit--select');

//     selectBtns.forEach((btn) => {
//       btn.addEventListener('click', (evt) => {
//         const target = evt.currentTarget;
//         const dataPrice = target.getAttribute('data-price');
//         utilsRemoveClassForSiblings(target, 'unit--active');
//         target.classList.add('unit--active');
//         this._updatePrice(dataPrice);
//       });
//     });
//   }

//   _updatePrice(type) {
//     this._cardItem.querySelector('.goldPrice').textContent = type === 'alt' ? this._priceGoldAlt : this._priceGold;
//     this._cardItem.querySelector('.retailPrice').textContent = type === 'alt' ? this._priceRetailAlt : this._priceRetail;
//   }

//   _quantityCounterUp() {
//     this.quantity++;
//     this._updateCounter();
//   }

//   _quantityCounterDown() {
//     this.quantity > 0 ? this.quantity-- : 0;
//     this._updateCounter();
//   }

//   _updateCounter() {
//     this._cardItem.querySelector('.stepper-input').value = this.quantity;
//   }
// }

// const utilsRemoveClassForSiblings = (target, className) => {
//   [...target.parentElement.children].forEach((sib) =>
//     sib.classList.remove(className)
//   );
// };