from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Post(models.Model):
    id=models.AutoField(primary_key=True)
    title=models.CharField(max_length=100)
    body=models.TextField()
    user_id=models.ForeignKey(User, on_delete=models.CASCADE,related_name='posts')
    status=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.body)

class Review(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.comment) 