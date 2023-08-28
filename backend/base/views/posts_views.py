from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage

from base.models import Post, Review
from base.serializers import PostSerializer

from rest_framework import status
from datetime import datetime

# chatgpt
import openai
import os 

openai.api_key= os.getenv("OPENAI_API_KEY")

def completion(word):
    response=openai.ChatCompletion.create(
    model='gpt-3.5-turbo',
    # messages={'role':'user','content':'다음 문장을 긍정적으로 생각할 수 있도록 바꿔줘 => "{word}"'})
    # return response[0].message.content
        messages=[{'role':'user','content': word}])
    return response['choices'][0]['message']['content'].strip()



@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getPosts(request):
    print(request.data)
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    print("query : ", query)
    posts = Post.objects.filter(user_id=request.user, title__icontains=query)
    
    # 5개의 post를 한 페이지로 설정(개수는 나중에 프론트에서 보고 다시 설정)
    page = request.query_params.get('page', 1)
    paginator = Paginator(posts, 20)

    try:
        posts = paginator.page(page)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    serializer = PostSerializer(posts, many=True) 
    return Response({'posts': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPosts(request):
    data = request.data
    user = request.user
    now = datetime.now()
    
    posts=Post.objects.create(
        # id=user,
        title= data['title'],
        body= data['body'],
        user_id=user,
        status=True,
        created_at=now,
    )

    serializer=PostSerializer(posts, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def createPostsReview(request,pk):
    post=Post.objects.get(id=pk)
    print(post.body)
    comment=completion(post.body)
    # user=request.user
    data=request.data
    now=datetime.now()

    print('코멘트 값' + comment)

    alreadyExists=post.review_set.filter(_id=pk)
    if alreadyExists:
        content={'detail':'아직 안 풀렸구나. 새로운 문장을 만들어줄게.'}
    
        review=Review.objects.create(
            post=post,
            # user=user,
            name='chatgpt',
            comment=comment,
            createdAt=now,
            # _id=post.body,
        )
        return Response(content)
    else: 
        review=Review.objects.create(
            post=post,
            # user=user,
            name='chatgpt',
            comment=comment,
            createdAt=now,
            # _id=post.body,
        )
        return Response('Review Added')


@api_view(['GET'])
def getPost(request, pk):
    # post = Post.objects.get(id=pk)
    # serializer = PostSerializer(post, many=True)
    # return Response(serializer.data)
    try:
        post = Post.objects.get(id=pk)
    except Post.DoesNotExist:
        return Response({'detail': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = PostSerializer(post)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updatePosts(request, pk):
    data = request.data
    post = Post.objects(id=pk)
    
    post.title = data['title']
    post.body = data['body']
    
    post.save()

    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deletePosts(request, pk):
    post=Post.objects.get(id=pk)
    post.delete()
    return Response('Post Deleted')

