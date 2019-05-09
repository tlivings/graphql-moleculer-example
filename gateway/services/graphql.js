
const { ApolloServer } = require('apollo-server');
const GraphQLComponent = require('graphql-component');
const AuthorComponent = require('../components/author');
const BookComponent = require('../components/book');

const service = {
  name: 'graphql-gateway',
  created() {
    const broker = this.broker;

    const { schema, context } = new GraphQLComponent({ imports: [new AuthorComponent({ broker }), new BookComponent({ broker })] });

    this.server = new ApolloServer({
      schema,
      context
    });
  },
  async started() {
    const { url } = await this.server.listen();

    console.log(`🚀 Server ready at ${url}`);
  },
  async stopped() {
    await this.server.stop();
  }
};

module.exports = service;