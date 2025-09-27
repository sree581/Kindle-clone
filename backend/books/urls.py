from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, MyBooksView, StartPaymentView, VerifyPaymentView

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')

# This is a clean, intentional list of all active URLs.
urlpatterns = [
    path('', include(router.urls)),
    path('my-books/', MyBooksView.as_view(), name='my-books'),
    path('start-payment/<int:book_id>/', StartPaymentView.as_view(), name='start-payment'),
    path('verify-payment/', VerifyPaymentView.as_view(), name='verify-payment'),
]

