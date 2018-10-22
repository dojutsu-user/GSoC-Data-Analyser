from django.urls import path
from api import views as api_view

urlpatterns = [
    path('search', api_view.search),
]