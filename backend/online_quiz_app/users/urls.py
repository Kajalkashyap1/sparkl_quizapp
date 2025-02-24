from django.urls import path
from .views import user_login, signup

urlpatterns = [
    path("login/", user_login, name="login"),
    path("signup/", signup, name="signup")
]
