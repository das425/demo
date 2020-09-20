from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.conf import settings
from django.shortcuts import redirect

class Article(models.Model):
    title = models.CharField(max_length=64)
    content = models.TextField(blank=True)
    author = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        related_name = 'article_set',
    )

class Comment(models.Model):
    article = models.ForeignKey(
        Article,
        on_delete = models.CASCADE,
        related_name='article_comment_set',
    )
    content = models.TextField(blank=True)
    author = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        related_name = 'user_comment_set',
    )
