from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
import razorpay

from .models import Book
from .serializers import BookSerializer

# Initialize Razorpay client
razorpay_client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

class BookViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class MyBooksView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return self.request.user.owned_books.all()

class StartPaymentView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, book_id):
        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

        amount = int(book.price * 100)
        payment_order = {
            'amount': amount,
            'currency': 'INR',
            'receipt': f'receipt_book_{book.id}',
            'payment_capture': 1
        }
        try:
            order = razorpay_client.order.create(data=payment_order)
            return Response(order, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VerifyPaymentView(APIView):
    permission_classes = [IsAuthenticated]
    @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        data = request.data
        book_id = data.get('book_id')
        try:
            params_dict = {
                'razorpay_order_id': data['razorpay_order_id'],
                'razorpay_payment_id': data['razorpay_payment_id'],
                'razorpay_signature': data['razorpay_signature']
            }
            razorpay_client.utility.verify_payment_signature(params_dict)

            book = Book.objects.get(id=book_id)
            user = User.objects.get(id=request.user.id)
            book.owners.add(user)
            return Response({'status': 'payment successful'}, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'Payment verification failed', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)

