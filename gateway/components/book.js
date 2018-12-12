
const Author = require('./author');
const GraphQLComponent = require('../lib/component');

const types = `
    # This is a book.
    type Book {
        id: ID!
        # The name of the book.
        name: String,
        # The book's author.
        author: Author
    }
`;

const rootTypes = `
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
        return call('book.query', { id });
    }
  },
  Mutation: {
      book(_, { name, author_id }, { call }) {
          return call('book.mutate', { name, author_id });
      }
  },
  Book: {
    author(book, args, context, info) {
      return Author.bindings.query.author({ id: book.author_id }, info, { context });
    }
  }
};

const fixtures = {
  Query: {
    book() {
      return { id: 'an id', name: 'Test Book', author_id: 'author id' };
    }
  }
};

module.exports = new GraphQLComponent({ types, rootTypes, resolvers, imports: [Author], fixtures });
