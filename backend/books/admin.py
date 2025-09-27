from django.contrib import admin
from .models import Book

# 1. Create a custom admin class for the Book model
class BookAdmin(admin.ModelAdmin):
    # 2. Display these fields in the list view for easy reference
    list_display = ('title', 'author', 'price')
    # 3. Add a search bar to find books by title or author
    search_fields = ('title', 'author')
    # 4. Use a filter for ManyToManyFields to make selecting owners easier
    filter_horizontal = ('owners',)

# 5. Register the Book model with our custom BookAdmin class
admin.site.register(Book, BookAdmin)
