
const GraphQLComponent = require('graphql-component');

class AuthorComponent extends GraphQLComponent {
  constructor({ broker }) {

    const types = `
      # An author.
      type Author {
        id: ID!
        # The author name.
        name: String,
        # The author email.
        email: String
      }
      type Query {
        # Seach for an author by id.
        author(id: ID!, version: String) : Author
      }
      type Mutation {
        # Create a new book.
        author(name: String!) : Author
      }
    `;

    const resolvers = {
      Query: {
        author(_, { id }, { call }) {
          return this._broker.call('author.query', { id });
        }
      },
      Mutation: {
        author(_, { name }, { call }) {
          return this._broker.call('author.mutate', { name });
        }
      }
    };

    super({ types, resolvers });

    this._broker = broker;
  }
}

module.exports = AuthorComponent;