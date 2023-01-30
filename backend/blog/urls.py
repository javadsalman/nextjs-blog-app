from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view),
    path('register/', views.register_view),
    path('logout/', views.logout_view),
    path('articles/', views.ArticleListView.as_view()),
    path('articles/<int:pk>/', views.ArticleDetailView.as_view()),
]
