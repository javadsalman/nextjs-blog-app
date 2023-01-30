from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import status
from .serializers import ArticleSerializer, AuthorSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Article
from .permissions import ArticlePermission

# Create your views here.

@api_view(['POST'])
def login_view(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')
    user = User.objects.filter(username=username).first()
    if user:
        if user.check_password(password):
            serializer = AuthorSerializer(instance=user)
            return Response(serializer.data, status=status.HTTP_200_OK)            
        else:
            return Response({'detail': 'Password is incorrect!'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'detail': 'User not found!'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def register_view(request):
    serializer = AuthorSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
@api_view(['POST'])
def logout_view(request):
    request.user.auth_token.delete()
    return Response({'detail': 'Logged out successfully!'}, status=status.HTTP_202_ACCEPTED)
    
    
    
class ArticleListView(ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [ArticlePermission]
    
    def get_serializer_context(self):
        return {'request': self.request}
    
class ArticleDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [ArticlePermission]