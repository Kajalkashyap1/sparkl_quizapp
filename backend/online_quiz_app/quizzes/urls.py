from django.urls import path
from .views import get_quizzes, create_quiz

urlpatterns = [
    path("quizzes/", get_quizzes, name="get_quizzes"),
    path("quizzes/create/", create_quiz, name="create_quiz"),
]
