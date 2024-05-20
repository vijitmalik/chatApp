from django.urls import path
from . import views

urlpatterns = [
    path('room/<int:recipient_id>/', views.chat_room),
    path('send/<int:recipient_id>/', views.send_message),
]
