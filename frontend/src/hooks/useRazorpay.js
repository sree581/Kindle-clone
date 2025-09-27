import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const useRazorpay = () => {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const processPayment = async (book) => {
        if (!authToken) {
            alert('Please log in to make a purchase.');
            return;
        }

        try {
            const orderResponse = await axios.post(
                `https://kindle-clone-backend.onrender.com/api/start-payment/${book.id}/`,
                {},
                { headers: { Authorization: `Token ${authToken}` } }
            );

            const orderData = orderResponse.data;

            const options = {
                // THE FIX: Securely load the key from the environment variable
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Story Time',
                description: `Purchase of ${book.title}`,
                order_id: orderData.id,
                handler: async function (response) {
                    try {
                        await axios.post(
                            'https://kindle-clone-backend.onrender.com/api/verify-payment/',
                            {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                book_id: book.id,
                            },
                            { headers: { Authorization: `Token ${authToken}` } }
                        );
                        alert('Payment successful! Book added to your library.');
                        navigate('/my-library');
                    } catch (verifyError) {
                        console.error('Payment verification failed:', verifyError);
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: 'Valued Reader',
                    email: 'reader@example.com',
                },
                theme: {
                    color: '#0ea5e9',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Failed to start payment:', error);
            alert('Could not initiate payment. Please try again.');
        }
    };

    return processPayment;
};

export default useRazorpay;
