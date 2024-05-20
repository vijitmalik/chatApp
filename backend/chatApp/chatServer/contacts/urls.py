from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_contacts),
    path('<int:contact_id>/', views.contact_detail),
]
