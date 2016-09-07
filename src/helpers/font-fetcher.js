import { get } from 'request';

export default class FontFetcher {
  constructor() {
    let apiKey = 'AIzaSyD5TS2oiVewiyJEdJC18PrM5DK6vaQPKpc';
    this.url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;
  }

  get(cb) {
    get(this.url, cb);
  }
}