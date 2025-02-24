from django.db import models
from django.contrib.auth import get_user_model


class User(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('user', 'User'),
    ]
    
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)  # Django handles password hashing
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

    username = None  # Remove default username field
    USERNAME_FIELD = 'email'  # Set email as the unique identifier
    REQUIRED_FIELDS = ['name', 'role']

    def __str__(self):
        return self.email
    

# User = get_user_model()

# class LoginHistory(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     login_time = models.DateTimeField(auto_now_add=True)
#     ip_address = models.GenericIPAddressField(null=True, blank=True)
#     user_agent = models.TextField(null=True, blank=True)  # To store browser details
    
#     def __str__(self):
#         return f"{self.user.email} - {self.login_time}"
