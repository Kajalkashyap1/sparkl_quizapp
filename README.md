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
   git clone https://github.com/Kajalkashyap1/sparkl_quizapp.git
   cd sparkl_quizapp
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
   cd frontend/online-quiz
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
- **Login:** `/api/users/login` (POST)
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
curl -X POST http://localhost:8000/api/users/login/ \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "password"}'
```


## Next Steps
- Improve frontend UI for quiz management
- Add user roles and permissions
- Implement quiz scoring logic
- implement some backend functionality

---
_Developed by Kajal Kashyap_

