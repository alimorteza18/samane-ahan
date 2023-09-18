class storage {
  static set(key, cartItems) {
    localStorage.setItem(key, JSON.stringify(cartItems));
  }

  static get(key, defaultValue = null) {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return defaultValue;
    }
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}

export default storage;
