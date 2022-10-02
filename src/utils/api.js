class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkServerResponse);
  }

  getInitialCards() {
    return this._request(`${this._baseURL}/cards`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  updateUserInfo(data) {
    return this._request(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  updateUserAvatar(data) {
    return this._request(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      }),
    });
  }

  addCardData(data) {
    return this._request(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    });
  }

  likeCard(cardId, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    return this._request(`${this._baseURL}/cards/likes/${cardId}`, {
      method: method,
      headers: this._headers,
    });
  }

  deleteCardData(cardId) {
    return this._request(`${this._baseURL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  processInitialRequests(requestsArray) {
    return Promise.all(requestsArray).then((res) => {
      return res;
    });
  }
}

const api = new Api({
  baseURL: 'https://around.nomoreparties.co/v1/cohort-3-en',
  headers: {
    authorization: 'e9954642-7ca9-42fe-b8e5-fe91e4314998',
    'Content-Type': 'application/json',
  },
});

export default api;
