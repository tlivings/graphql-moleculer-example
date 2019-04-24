
const { ServiceBroker } = require('moleculer');
const DB = require('./db');

const broker = new ServiceBroker({
  nodeID: 'node-author',
  transporter: 'nats://nats-server:4222',
  logLevel: 'info',
  cacher: 'memory'
});

const db = new DB();

broker.createService({
  name: 'author',
  actions: {
    query({ params }) {
      return db.get(params.id)
    },
    mutate({ params }) {
      return db.set({ name: params.name });
    }
  }
});

broker.start();