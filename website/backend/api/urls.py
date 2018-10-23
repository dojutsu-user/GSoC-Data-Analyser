from django.urls import path
from api import views as api_view

urlpatterns = [
    path('search', api_view.search),
    path('overview/gsoc/', api_view.gsoc_overview),
    path('overview/<year>/', api_view.overview_of_specific_year),
    path('org/<slug>/', api_view.org_overview),
]