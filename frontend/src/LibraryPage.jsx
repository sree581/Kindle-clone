import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://127.00.1:8000/api/books/');
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books!", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="bg-light-bg min-h-screen">
      <main className="container mx-auto p-8">
        <h2 className="text-4xl font-extrabold text-text-dark text-center mb-12">Discover Your Next Adventure</h2>
        {isLoading ? (
            <p className="text-center text-text-light">Loading books...</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {books.map(book => (
                    <BookCard key={book.id} book={book} isOwned={false} />
                ))}
            </div>
        )}
      </main>
    </div>
  );
}

export default LibraryPage;

