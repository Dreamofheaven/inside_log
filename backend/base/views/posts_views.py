from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.core.paginator import Paginator

from base.models import Post, Review
from base.serializers import PostSerializer

from rest_framework import status
from datetime import datetime

# chatgpt
import openai
import os 

openai.api_key= os.getenv("OPENAI_API_KEY")
def completion(word):
    content=openai.ChatCompletion.create(
    model='gpt-3.5-turbo',
    messages={'role':'user','content':'다음 문장을 긍정적으로 생각할 수 있도록 바꿔줘 => "{word}"'})
    return content[0].message.content


@api_view(['GET'])
def getPosts(request):
    # query = request.query_params.get('keyword')
    # if query == None:
    #     query = ''

    posts = Post.objects.all()
    
    # 5개의 post를 한 페이지로 설정(개수는 나중에 프론트에서 보고 다시 설정)
    page = request.query_params.get('page')
    paginator = Paginator(posts, 5)

    posts = paginator.page(page)

    if page == None:
        page = 1
    page = int(page)
    serializer = PostSerializer(posts, many=True) 
    return Response({'posts': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['POST'])
def createPosts(request):
    user=request.user
    
    posts=Post.objects.create(
        id=user,
        title='짜증나',
        body='종강 언제 시켜줘. 교수 다리 걸고 넘어뜨려서 종강시켜버리고 싶다.',
        user_id='mimi',
        status=True,
        created_at='2023-08-01',
    )

    serializer=PostSerializer(posts, many=False)
    return Response(serializer.data)


@api_view(['POST'])#####
def createPostsReview(request,pk):
    comment=completion(request)
    user=request.user
    post=Post.object.get(_id=pk)
    data=request.data
    now=datetime.now()

    alreadyExists=post.review_set.filter(id=id)
    if alreadyExists:
        content={'detail':'아직 안 풀렸구나. 새로운 문장을 만들어줄게.'}
    
        review=Review.objects.create(
            post=post,
            user=user,
            name='chatgpt',
            comment=comment,
            createdAt=now,
            _id=post.body,
        )
        return Response(content)
    else: 
        review=Review.objects.create(
            post=post,
            user=user,
            name='chatgpt',
            comment=comment,
            createdAt=now,
            _id=post.body,
        )
        return Response('Review Added')


@api_view(['GET'])
def getPost(request, pk):
    post = Post.object.get(_id=pk)
    serializer = PostSerializer(post, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updatePosts(request, pk):
    data = request.data
    post = Post.objects(_id=pk)
    
    post.title = data['title']
    post.body = data['body']
    
    post.save()

    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deletePosts(request, pk):
    post=Post.objects.get(_id=pk)
    post.delete()
    return Response('Post Deleted')

