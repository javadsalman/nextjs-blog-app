from rest_framework import permissions


class ArticlePermission(permissions.BasePermission):
    
    def has_object_permission(self, request, view, article):
        if request.method in permissions.SAFE_METHODS:
            return True
        return article.author == request.user