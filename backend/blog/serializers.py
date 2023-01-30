from rest_framework import serializers
from .models import Article
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class AuthorSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'token']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True}
        }
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def get_token(self, user):
        token, created = Token.objects.get_or_create(user=user)
        return token.key
    

        
class ArticleSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(source='author.id', read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
        
    def create(self, validated_data):
        article = Article.objects.create(author=self.context['request'].user, **validated_data)
        return article
