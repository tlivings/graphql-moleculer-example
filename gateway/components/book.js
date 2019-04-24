
const Author = require('./author');
const GraphQLComponent = require('graphql-component');

const types = `
    # This is a book.
    type Book {
        id: ID!
        # The name of the book.
        name: String,
        # The book's author.
        author: Author
    }
    type Query {
      # Search for a book by id.
      book(id: ID!) : Book
    }
    type Mutation {
        # Create a new book.
        book(name: String!, author_id: ID!) : Book
    }
`;

const resolvers = {
  Query: {
    book(_, { id }, { call }) {
        return this._broker.call('book.query', { id });
    }
  },
  Mutation: {
      book(_, { name, author_id }, { call }) {
          return this._broker.call('book.mutate', { name, author_id });
      }
  },
  Book: {
    async author(book, args, context, info) {
      
      const { data, errors } = await this._authorComponent.execute(`query { author(id: "${book.author_id}") { ...AllAuthor }}`, context);

      if (errors) {
        throw errors[0];
      }
    
      return data.author;
    }
  }
};

class BookComponent extends GraphQLComponent {
  constructor({ broker }) {
    const authorComponent = new Author({ broker });

    super({ types, resolvers, imports: [ authorComponent ] });
    
    this._broker = broker;
    this._authorComponent = authorComponent;
  }
}

module.exports = BookComponent;
