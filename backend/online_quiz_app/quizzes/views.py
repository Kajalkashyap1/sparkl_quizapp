from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Quiz, Question, QuestionOption, QuizAttempt
from django_ratelimit.decorators import ratelimit

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@ratelimit(key='user', rate='100/s', method='GET', block=True)
def get_quizzes(request):
    quizzes = Quiz.objects.all().values("id", "title", "total_score", "duration")
    return Response(list(quizzes))

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@ratelimit(key='user', rate='100/s', method='POST', block=True)
def create_quiz(request):
    if not request.user.is_admin:
        return Response({"error": "Unauthorized"}, status=403)
    
    quiz = Quiz.objects.create(
        title=request.data["title"],
        total_score=request.data["total_score"],
        duration=request.data["duration"]
    )
    return Response({"message": "Quiz created", "quiz_id": quiz.id})
