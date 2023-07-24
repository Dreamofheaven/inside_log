from django.db import models

# Create your models here.

class Users(models.Model):
    id=models.AutoField(primary_key=True)
    username=models.CharField(max_length=20)

class Post(models.Model):
    id=models.AutoField(primary_key=True)
    title=models.CharField(max_length=100)
    body=models.TextField()
    user_id=models.ForeignKey(Users, on_delete=models.CASCADE,related_name='posts')
    status=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)