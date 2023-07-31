from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes = ['hello', '123']

    return Response(routes)

@api_view(['GET'])
def getArticle(request):
    index = {
        "id": "2",
        "name": "bonobono",
        "brand": "apple",
        "rating": 4.0
    }

    return Response(index)