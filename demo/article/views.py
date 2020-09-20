from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate,login,logout
import json
from json import JSONDecodeError
from .models import Article,Comment

#@csrf token
def signup(request):
    if request.method == 'POST':
        #create new user
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        User.objects.create_user(username = username, password = password)
        return HttpResponse(status=201)
    else:
        return HttpResponse(status=405)

def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request,username = username, password = password)
        if user is not None:
            login(request,user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
            #invalid Login
    else:
        return HttpResponse(status=405)
    

def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
            #invalid Logout
    else:
        return HttpResponse(status=405)

def article(request):
    if request.method == 'GET':
        #get article list
        if request.user.is_authenticated:
            article_all_list = []
            for article in Article.objects.all():
                article_dict = {
                    "title":article.title,
                    "content":article.content,
                    "author":article.author.id,
                }
                article_all_list.append(article_dict)
            return HttpResponse(json.dumps(article_all_list),status=200)
            #JsonResponse(article_all_list,safe=False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        #create new article
        if request.user.is_authenticated:
            try:
                body = request.body.decode()
                article_title = json.loads(body)['title']
                article_content = json.loads(body)['content']
                article_author = request.user
            except(KeyError,JSONDecodeError) as e:
                return HttpResponse(status=400)
            article = Article(title = article_title, content = article_content, author = article_author)
            article.save()
            response_dict = {'id':article.id, 'title':article.title, 'content':article.content, 'author':article.author.id}
            return HttpResponse(json.dumps(response_dict),status=201)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponse(status=405)
    
def article_id(request,article_id=0):
    if request.method == 'GET':
        #get specified article
        if request.user.is_authenticated:
            try:
                article = Article.objects.get(id=article_id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            article_dict = {'title':article.title,'content':article.content,'author':article.author.id}
            return HttpResponse(json.dumps(article_dict),status=200)
            #JsonResponse(article,safe=False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        #edit specified article
        if request.user.is_authenticated:
            try:
                target_article = Article.objects.get(id=article_id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            if request.user.id == target_article.author.id:
                try :
                    body = request.body.decode()
                    article_title = json.loads(body)['title']
                    article_content = json.loads(body)['content']
                except(KeyError, JSONDecodeError) as e:
                    return HttpResponse(status=400)
                article = Article.objects.get(id=article_id)
                article.title = article_title
                article.content = article_content
                article.save()
                response_dict = {'id':article.id,'title':article.title,'content':article.content,'author':article.author.id}
                return HttpResponse(json.dumps(response_dict),status=200)
            else:
                return HttpResponse(status=403)
        else:
            return HttpResponse(status=401)
    elif request.method == 'DELETE':
        #delete specified article
        if request.user.is_authenticated:
            try:
                target_article = Article.objects.get(id=article_id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            if request.user.id == target_article.author.id:
                Comment.objects.filter(article = target_article).delete()
                Article.objects.get(id=article_id).delete()
                return HttpResponse(status=200)
            else:
                return HttpResponse(status=403)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponse(status=405)

def article_id_comment(request,article_id = 0):
    if request.method == 'GET':
        #get comments of specified article
        if request.user.is_authenticated:
            try:
                article = Article.objects.get(id=article_id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            comments = [{'article':comment.article.id,'content':comment.content,'author':comment.author.id} for comment in Comment.objects.filter(article = article)]
            return HttpResponse(json.dumps(comments),status=200)
            #JsonResponse(comments,safe=False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        #create comment on specified article
        if request.user.is_authenticated:
            try:
                target_article = Article.objects.get(id=article_id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            try:
                body = request.body.decode()
                article = Article.objects.get(id=article_id)
                comment_article = article
                comment_content = json.loads(body)['content']
                comment_author = request.user
            except(KeyError,JSONDecodeError) as e:
                return HttpResponse(status=400)
            comment = Comment(article = comment_article, content = comment_content, author = comment_author)
            comment.save()
            response_dict = {'id':comment.id,'article':comment.article.id,'content':comment.content,'author':comment.author.id}
            return HttpResponse(json.dumps(response_dict),status=201)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponse(status=405)

def comment_id(request,comment_id=0):
    if request.method == 'GET':
        #get specified comment
        if request.user.is_authenticated:
            try:
                comment = Comment.objects.get(id=comment_id)
            except Comment.DoesNotExist:
                return HttpResponse(status=404)
            comment_dict = {'article':comment.article.id,'content':comment.content,'author':comment.author.id}
            return HttpResponse(json.dumps(comment_dict),status=200)
            #JsonResponse(comment,safe=False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        #edit specified comment
        if request.user.is_authenticated:
            try:
                target_comment = Comment.objects.get(id=comment_id)
            except Comment.DoesNotExist:
                return HttpResponse(status=404)
            if request.user.id == target_comment.author.id:
                try:
                    body = request.body.decode()
                    comment_content = json.loads(body)['content']
                except(KeyError, JSONDecodeError) as e:
                    return HttpResponse(status=400)
                comment = Comment.objects.get(id=comment_id)
                comment.content = comment_content
                comment.save()
                response_dict = {'id':comment.id,'article':comment.article.id,'content':comment.content,'author':comment.author.id}
                return HttpResponse(json.dumps(response_dict),status=200)
            else:
                return HttpResponse(status=403)
        else:
            return HttpResponse(status=401)
    elif request.method == 'DELETE':
        #delete specified comment
        if request.user.is_authenticated:
            try:
                target_comment = Comment.objects.get(id=comment_id)
            except Comment.DoesNotExist:
                return HttpResponse(status=404)
            if request.user.id == target_comment.author.id:
                comment = Comment.objects.get(id=comment_id)
                Comment.objects.get(id=comment_id).delete()
                return HttpResponse(status=200)
            else:
                return HttpResponse(status=403)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponse(status=405)
   


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)