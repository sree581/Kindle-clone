import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function ReaderPage() {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { bookId } = useParams(); // This hook gets the ID from the URL
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookContent = async () => {
      if (!authToken) return;

      try {
        // We use the bookId from the URL to fetch the specific book
        const response = await axios.get(`http://127.0.0.1:8000/api/books/${bookId}/`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookContent();
  }, [bookId, authToken]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading book...</div>;
  }

  if (!book) {
    return <div className="p-8 text-center text-red-500">Could not load book. You may not own this book.</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <nav className="bg-gray-50 p-4 shadow flex justify-between items-center sticky top-0">
        <h1 className="text-xl font-bold">{book.title}</h1>
        <Link to="/my-library" className="text-blue-500 hover:text-blue-700">
          &larr; Back to My Library
        </Link>
      </nav>
      <main className="p-8 md:p-12 lg:p-16">
        <div className="prose lg:prose-xl max-w-4xl mx-auto">
          <p style={{ whiteSpace: 'pre-wrap' }}>{book.content}</p>
        </div>
      </main>
    </div>
  );
}

export default ReaderPage;
