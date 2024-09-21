const mockQuery = jest.fn();

const Pool = jest.fn(() => ({
  query: mockQuery,
  end: jest.fn(),
}));

export { Pool, mockQuery };