class MainApi {
  constructor (options) {
    this._baseUrl = options.baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  }

  getCurrentUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(res => this._getResponseData(res))
  }

  createUser(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      email,
      password,
      name,})
    }).then(res => this._getResponseData(res))
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
      .then(res => this._getResponseData(res))
      .then(res => res);
  }

  updateUser(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
      })
    }).then(res => this._getResponseData(res))
  }

  signOut() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(res => this._getResponseData(res))
  }

  /*Работа с фильмами*/

  putLike({
            country,
            director,
            duration,
            year,
            description,
            trailerLink,
            nameRU,
            nameEN,
            id,
          }, thumbnail, image) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId: id,
      })
    }).then(res => this._getResponseData(res));
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then(res => this._getResponseData(res));
  }

  removeSavedMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then(res => this._getResponseData(res))
  }
}

export default new MainApi({
  baseUrl: 'https://api.movies-explorer.eshen.nomoredomains.club',
});
