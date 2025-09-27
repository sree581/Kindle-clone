import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import useRazorpay from './hooks/useRazorpay';
import { AuthContext } from './AuthContext';

function BookDetailPage() {
    const [book, setBook] = useState(null);
    const [isOwned, setIsOwned] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { bookId } = useParams();
    const { authToken } = useContext(AuthContext);
    const processPayment = useRazorpay();

    useEffect(() => {
        const fetchBookAndOwnership = async () => {
            setIsLoading(true);
            console.clear(); // Clear the console for a clean test
            console.log("--- Starting ownership check ---");
            console.log(`Checking for Book ID: ${bookId} (Type: ${typeof bookId})`);

            try {
                const bookPromise = axios.get(`http://127.0.0.1:8000/api/books/${bookId}/`);
                
                const ownershipPromise = authToken 
                    ? axios.get('http://127.0.0.1:8000/api/my-books/', {
                        headers: { Authorization: `Token ${authToken}` }
                      })
                    : Promise.resolve({ data: [] });

                const [bookResponse, myBooksResponse] = await Promise.all([bookPromise, ownershipPromise]);

                setBook(bookResponse.data);

                // --- THE INTERROGATION ---
                console.log("User's owned books (from API):", myBooksResponse.data);
                const ownedBooksArray = myBooksResponse.data;
                const ownedBook = ownedBooksArray.find(b => {
                    console.log(`Comparing API book ID ${b.id} (Type: ${typeof b.id}) with URL book ID ${bookId} (Type: ${typeof bookId})`);
                    return b.id === parseInt(bookId)
                });
                
                console.log("Did we find a match?", ownedBook);
                // --- END INTERROGATION ---

                if (ownedBook) {
                    console.log("Conclusion: User OWNS this book. Setting isOwned to true.");
                    setIsOwned(true);
                } else {
                    console.log("Conclusion: User DOES NOT own this book. isOwned remains false.");
                }

            } catch (error) {
                console.error("Error fetching book details:", error);
            } finally {
                setIsLoading(false);
                console.log("--- Ownership check complete ---");
            }
        };
        fetchBookAndOwnership();
    }, [bookId, authToken]);

    if (isLoading) {
        return <div className="text-center p-8">Loading Book...</div>;
    }

    if (!book) {
        return <div className="text-center p-8 text-red-500">Could not find this book.</div>
    }

    return (
        <div className="bg-light-bg min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                    <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">Cover Image</span>
                    </div>
                </div>
                <div className="md:w-2/3 flex flex-col">
                    <h1 className="text-4xl font-extrabold text-text-dark">{book.title}</h1>
                    <p className="text-xl text-text-light mt-2">by {book.author}</p>
                    <p className="text-3xl font-bold text-primary my-6">₹{book.price}</p>
                    <p className="text-text-light leading-relaxed mb-8">{book.description}</p>
                    <div className="mt-auto">
                        {isOwned ? (
                            <Link to={`/read/${book.id}`} className="w-full text-center block bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors">
                                Read Now
                            </Link>
                        ) : (
                            <button 
                                onClick={() => processPayment(book)}
                                className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
                            >
                                Buy Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetailPage;

