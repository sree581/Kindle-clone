# books/models.py
from django.db import models
from django.contrib.auth.models import User 

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2, default=99.99)
    cover_image_url = models.URLField()
    content = models.TextField(default="Once upon a time...")
    owners = models.ManyToManyField(User, related_name='owned_books', blank=True)

    def __str__(self):
        return self.title

