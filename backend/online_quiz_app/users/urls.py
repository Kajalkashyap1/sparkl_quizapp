from django.urls import path
from .views import user_login, signup
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("login/", user_login, name="login"),
    path("signup/", signup, name="signup"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

]
