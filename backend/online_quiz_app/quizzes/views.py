from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Quiz, Question, QuestionOption, QuizAttempt
from django_ratelimit.decorators import ratelimit
from rest_framework_simplejwt.authentication import JWTAuthentication


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@ratelimit(key='user', rate='100/s', method='GET', block=True)
def get_quizzes(request):
    quizzes = Quiz.objects.all().values("id", "title", "total_score", "duration")
    return Response(list(quizzes))

@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_quiz(request):
    data = request.data
    quiz = Quiz.objects.create(
        title=data["title"],
        questions=data["questions"],
        score=data["score"],
        duration=data["duration"],
        created_by=request.user
    )
    return Response({"message": "Quiz Created", "quiz_id": quiz.id}, status=201)
