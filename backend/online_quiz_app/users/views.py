from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
import json
from .models import User  # Import your custom User model
from django.contrib.auth import authenticate, login

@csrf_exempt  
def signup(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Parse JSON data from request
            name = data.get("name")
            email = data.get("email")
            password = data.get("password")
            role = data.get("role", "user")  # Default role is 'user'

            # if not name or not email or not password:
            #     return JsonResponse({"error": "Name, email, and password are required!"}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({"error": "Email already registered!"}, status=400)

            # Manually hash the password before storing it
            hashed_password = make_password(password)

            user = User.objects.create(
                name=name,
                email=email,
                password=hashed_password,  # Store the hashed password
                role=role
            )

            return JsonResponse({"message": "Signup successful!", "user_id": user.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def user_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Parse JSON data
            email = data.get("email")
            password = data.get("password")

            # ✅ Check if the email exists in the database
            try:
                user = User.objects.get(email=email)  # Fetch user manually
            except User.DoesNotExist:
                return JsonResponse({"error": "Email not registered"}, status=400)

            # ✅ Check password manually
            if check_password(password, user.password):  # Compare hashed password
                # login(request, user)  # Log in user
                return JsonResponse(
                    {"message": "Login successful!", "user": {"email": user.email, "role": user.role}},
                    status=200
                )
            else:
                return JsonResponse({"error": "Invalid password"}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)
