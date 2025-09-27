import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import BookCard from './BookCard';

function MyLibraryPage() {
  const [myBooks, setMyBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyBooks = async () => {
      if (!authToken) return;
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/my-books/', {
          headers: { Authorization: `Token ${authToken}` },
        });
        setMyBooks(response.data);
      } catch (error) {
        console.error("Error fetching your books!", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyBooks();
  }, [authToken]);

  return (
    <div className="bg-light-bg min-h-screen">
      <main className="container mx-auto p-8">
        <h2 className="text-4xl font-extrabold text-text-dark text-center mb-12">My Personal Bookshelf</h2>
        {isLoading ? (
          <p className="text-center text-text-light">Loading your books...</p>
        ) : myBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {myBooks.map(book => (
              <BookCard key={book.id} book={book} isOwned={true} />
            ))}
          </div>
        ) : (
          <div className="text-center text-text-light text-lg">
            <p>Your bookshelf is empty!</p>
            <p className="mt-2">Go to the main library to find your next adventure.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyLibraryPage;

