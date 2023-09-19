from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Post, Review
from base.serializers import PostSerializer, ReviewSerializer

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
    # print(request.data)
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    # print("query : ", query)
    posts = Post.objects.filter(user_id=request.user, title__icontains=query)
    
    # 5개의 post를 한 페이지로 설정(개수는 나중에 프론트에서 보고 다시 설정)
    page = request.query_params.get('page')
    paginator = Paginator(posts, 6)

    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
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
def getPostsReview(request,pk):
    print(request.data)
    reviews = Review.objects.filter(post_id=pk)    
    # 5개의 post를 한 페이지로 설정(개수는 나중에 프론트에서 보고 다시 설정)

    serializer = ReviewSerializer(reviews, many=True) 
    return Response(serializer.data)

@api_view(['POST'])
def createPostsReview(request,pk):
    post=Post.objects.get(id=pk)
    comment=completion(f"{post.body}. 답변은 한글로 말해줘.") # 이게 chatgpt답변 
    # comment=completion(post.body) # 이게 chatgpt답변 

    # user=request.user
    data=request.data
    now=datetime.now()

    print('코멘트 값' + comment)
    if comment: # 코멘트가 있다면 기존 답변 삭제하고 다시 생성
        content={'detail':'아직 안 풀렸구나. 새로운 문장을 만들어줄게.'}
        review=Review.objects.filter(post_id=pk).delete() # chatgpt답변 삭제
        review=Review.objects.create(
            post=post, 
            # user=user,
            name='chatgpt',
            comment=comment,
            createdAt=now,
            # _id=post.body,
        )
        serializer=ReviewSerializer(review, many=False)
        return Response(serializer.data)
        # return Response(content)
    else: # 없다면 그냥 생성
        review=Review.objects.create(
            post=post,
            # user=user,
            name='chatgpt',
            comment=comment,
            createdAt=now,
            # _id=post.body,
        )
        serializer=ReviewSerializer(review, many=False)
        return Response(serializer.data)
        # return Response('Review Added')


@api_view(['GET'])
def getPost(request, pk):
    # post = Post.objects.get(id=pk)
    # serializer = PostSerializer(post, many=True)
    # return Response(serializer.data)
    try:
        post = Post.objects.get(id=pk)
        print('포스트 불러오기')
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

# @permission_classes([IsAdminUser])
@api_view(['DELETE'])
def deletePosts(request, pk):
    post=Post.objects.get(id=pk)
    post.delete()
    return Response('Post Deleted')

