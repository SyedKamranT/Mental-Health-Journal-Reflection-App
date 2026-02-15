# Mental Health Journal Reflection App

## Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Python (FastAPI) + Supabase (PostgreSQL)
- **Deployment**: Vercel (Frontend), Render (Backend)

## Setup

### Frontend
1. Navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```

### Backend
1. Navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run server:
   ```bash
   uvicorn main:app --reload
   ```

## Environment Variables
- Copy `.env.example` to `.env` in both `frontend/` and `backend/` and fill in the values.
