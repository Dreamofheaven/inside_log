from django.urls import path
from base.views import user_view as views
    
urlpatterns = [
  path('login/', views.MyTokenobtainPairView.as_view(), name='token_obtain_pair'),
  path('register/',views.registerUser, name='register'),
  path('<str:pk>/', views.getUserById, name='user'),
  path('update/<str:pk>/',views.updateUser, name='user-update'),
  path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
]
