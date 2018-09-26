
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
`

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
        author(book, args, { call }) {
            return call('author.query', { id: book.author_id });;
        }
    }
};

module.exports = { types, rootTypes, resolvers };
