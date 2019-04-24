
const CUID = require('cuid');

class DB {
  constructor() {
    this.data = {
      'cj9ribob50000ridq580knp6j': {
        id: 'cj9ribob50000ridq580knp6j',
        name: 'J.R.R Tolkien'
      }
    };
  }
  get(id) {
    return this.data[id];
  }
  set(value) {
    const data = Object.assign({ id: CUID() }, value);
    this.data[data.id] = data;
    return this.data[data.id];
  }
}

module.exports = DB;
