import React, { useState, useEffect } from "react";


const BookSearch = () => {
  const [query, setQuery] = useState("harry potter");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}`
      );
      const data = await res.json();
      setBooks(data.docs);
    };

    fetchBooks();
  }, [query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); 
  };

  return (
    <div className="book-app">
      <div className="book-container">
        <h1>Book Search</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books..."
          />
          <button type="submit">Search</button>
        </form>

        <div className="book-list">
          {books.map((book, index) => (
            <div key={index} className="book-card">
              <h2>{book.title}</h2>
              <p>{book.author_name?.join(", ") || "Unknown Author"}</p>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;