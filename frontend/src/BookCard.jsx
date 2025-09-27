import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ book, isOwned }) {
    return (
        <Link to={isOwned ? `/read/${book.id}` : `/book/${book.id}`} className="block group">
            <div className="bg-white rounded-2xl shadow-lg h-full flex flex-col group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden border-2 border-white">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Cover Image</span>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-text-dark truncate">{book.title}</h2>
                    <p className="text-text-light mb-4">by {book.author}</p>
                    <div className="mt-auto">
                        {isOwned ? (
                             <span className="text-lg font-bold text-green-500">In Your Library</span>
                        ) : (
                             <p className="text-2xl font-bold text-primary">₹{book.price}</p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default BookCard;

