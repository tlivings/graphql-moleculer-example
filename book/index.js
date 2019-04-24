
const { ServiceBroker } = require('moleculer');
const DB = require('./db');

const broker = new ServiceBroker({
  nodeID: 'node-book',
  transporter: 'nats://nats-server:4222',
  logLevel: 'info',
  cacher: 'memory'
});

const db = new DB();

broker.createService({
  name: 'book',
  actions: {
    query({ params }) {
      return db.get(params.id);
    },
    mutate({ params }) {
      return db.set({ name: params.name, author_id: params.author_id });
    }
  }
});

broker.start();