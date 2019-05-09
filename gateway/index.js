

const { ServiceBroker } = require("moleculer");
const Gateway = require('./services/graphql');

const broker = new ServiceBroker({
  nodeID: 'node-gateway',
  transporter: 'nats://nats-server:4222',
  logLevel: 'info',
  cacher: 'memory'
});

broker.createService(Gateway);

broker.start();