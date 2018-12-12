
const { ApolloServer } = require('apollo-server');
const { ServiceBroker } = require("moleculer");
const { mergeComponentSchemas } = require('./lib/merge_components');

const { schema } = mergeComponentSchemas([require('./components/author'), require('./components/book')]);

const broker = new ServiceBroker({
    nodeID: 'node-gateway',
    transporter: 'nats://nats-server:4222',
    logLevel: 'info',
    cacher: 'memory'
});

const server = new ApolloServer({
    schema,
    context: async (request) => {
        return { call: broker.call.bind(broker), request };
    }
});

broker.start().then(() => {
    return server.listen();
}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});