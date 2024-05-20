from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/contacts/', include('chatServer.contacts.urls')),
    path('api/chat/', include('chatServer.chat.urls')),
]
