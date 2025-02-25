# Quiz API Project

## Overview
This project is a Django-based REST API for creating and managing quizzes. It uses Django Rest Framework (DRF) with JWT authentication.

## Technologies Used
- **Backend:** Django, Django Rest Framework (DRF)
- **Authentication:** JWT (JSON Web Token)
- **Database:** PostgreSQL
- **Frontend:** React (for consuming the API)
- **Postman:** For testing API endpoints

## Installation & Setup
### Prerequisites
- Python 3.x
- PostgreSQL
- Node.js (for frontend integration)

### Backend Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/quiz-api.git
   cd quiz-api
   ```
2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
4. **Configure `.env` file** (if using environment variables)
5. **Run database migrations**
   ```bash
   python manage.py migrate
   ```
6. **Create a superuser**
   ```bash
   python manage.py createsuperuser
   ```
7. **Start the server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup (React Example)
1. **Navigate to frontend folder**
   ```bash
   cd frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the frontend**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- **Login:** `/api/token/` (POST)
- **Refresh Token:** `/api/token/refresh/` (POST)

### Quiz Management
- **Create Quiz:** `/api/quizzes/create/` (POST, requires authentication)
- **Retrieve Quiz:** `/api/quizzes/{quiz_id}/` (GET)
- **List All Quizzes:** `/api/quizzes/` (GET)

## JWT Authentication Configuration
In `settings.py`:
```python
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "AUTH_HEADER_TYPES": ("Bearer",),
}
```

## Testing the API
Use **Postman** or **cURL**:

### Example Request (Create Quiz)
#### Fetch Token
```bash
curl -X POST http://localhost:8000/api/token/ \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "password"}'
```
#### Create Quiz (Using Token)
```bash
curl -X POST http://localhost:8000/api/quizzes/create/ \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_token_here" \
     -d '{
       "title": "Sample Quiz",
       "questions": [1, 2, 3],
       "score": 10,
       "duration": 30
     }'
```

## Common Issues & Debugging
1. **JWT Token Not Working?**
   - Ensure the token is included in the `Authorization` header as `Bearer <token>`
   - Check if the token is expired
   - Decode the token:
     ```python
     from rest_framework_simplejwt.tokens import AccessToken
     token_str = "your_jwt_token_here"
     token = AccessToken(token_str)
     print(token["user_id"])  # Should print the user ID
     ```
2. **pgAdmin4 Not Starting?**
   - Ensure PostgreSQL service is running
   - Restart pgAdmin4
   - Check for logs in `C:\Users\kajal\AppData\Local\Temp`

## Next Steps
- Improve frontend UI for quiz management
- Add user roles and permissions
- Implement quiz scoring logic

---
_Developed by Kajal Kashyap_

