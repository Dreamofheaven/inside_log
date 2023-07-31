from django.urls import path
from ..views import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('article/', views.getArticle, name="index"),
]
