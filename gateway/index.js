
const { ApolloServer } = require('apollo-server');
const { ServiceBroker } = require("moleculer");
const GraphQLComponent = require('graphql-component');
const AuthorComponent = require('./components/author');
const BookComponent = require('./components/book');

const broker = new ServiceBroker({
  nodeID: 'node-gateway',
  transporter: 'nats://nats-server:4222',
  logLevel: 'info',
  cacher: 'memory'
});

const { schema, context } = new GraphQLComponent({ imports: [new AuthorComponent({ broker }), new BookComponent({ broker })] });

const server = new ApolloServer({
  schema,
  context
});

broker.start().then(() => {
  return server.listen();
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});