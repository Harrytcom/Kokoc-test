const newsContainer = document.querySelector('#news__grid-wrapper-js');

const getNews = () => {
  fetch('https://dev.mykgproxy.webprofy.ru/upload/frontend/data.json', {
    method: 'POST',
    body: JSON.stringify({
      id: 1,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then((res) => res.json())
  .then((res) => {
    res.forEach((news) => {
      const newsItem = new Card(news);
      const newsElement = newsItem.generateCard();
      newsContainer.append(newsElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

// Не вижу явного преимущества использования POST-метода. Без строгого ТЗ реализовал бы через 'GET'
// Хотелось бы узнать, почему требуется именно метод POST.

// const getNews = () => {
//   fetch('https://dev.mykgproxy.webprofy.ru/upload/frontend/data.json')
  
//     .then((res) => res.json())
//     .then((res) => {
//       res.forEach((news) => {
//         const newsItem = new Card(news);
//         const newsElement = newsItem.generateCard();
//         newsContainer.prepend(newsElement);
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

getNews();

class Card {
  constructor(newsItem) {
    this._newsItem = newsItem;
    this._cardSelector = '#news__card-js';
    this._author = newsItem.author;
    this._date = newsItem.date;
    this._id = newsItem.id;
    this._imgUrl = newsItem.imgUrl;
    this._name = newsItem.name;
    this._text = newsItem.text;
    this._voteStatus = newsItem.voteStatus;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('.news__item-js')
      .cloneNode(true);
  }
  
  _setEventListeners() {
    this._newsItem.querySelector('.button-like-js').addEventListener('click', () => {
      this._likeHandler();
    });
  }
  
  _likeHandler() {
    this._newsItem.querySelector('.button-like-js').classList.toggle('button-like_active-js');
  }

  generateCard() {
    this._newsItem = this._getTemplate();
    this._newsItem.querySelector('.card__image-js').src = this._imgUrl;
    this._newsItem.querySelector('.card__image-js').alt = `На фото ` + `${this._name}`;
    this._newsItem.querySelector('.card__title-js').textContent = this._name;
    this._newsItem.querySelector('.card__date-js').textContent = this._date;
    this._newsItem.querySelector('.card__author-js').textContent = this._author;
    this._newsItem.querySelector('.card__body-js').textContent = this._text;
    this._newsItem.querySelector('.card__content-js').setAttribute('data-id', this._id);
    this._setEventListeners();

    return this._newsItem;
  }
}