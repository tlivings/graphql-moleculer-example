
const { ApolloServer } = require('apollo-server');
const Merge = require('./lib/merge');
const { ServiceBroker } = require("moleculer");

const broker = new ServiceBroker({
    nodeID: 'node-gateway',
    transporter: 'nats://nats-server:4222',
    logLevel: 'info',
    cacher: 'memory'
});

const server = new ApolloServer({
    schema: Merge([require('./partials/author'), require('./partials/book')]),
    context: async (request) => {
        return { call: broker.call.bind(broker), request };
    }
});

broker.start().then(() => {
    return server.listen();
}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});