# AurumCenter

A jewellery ecommerce application with a React storefront and a Django backend for catalogue, account, and order features.

## Technologies

React 19, Vite, JavaScript, Python, and Django.

## Setup and run

Install and start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Start the backend in a separate terminal:

```bash
cd backend
python -m venv .venv
.venv/Scripts/activate
python -m pip install django djangorestframework PyJWT
python manage.py migrate
python manage.py runserver
```

The backend currently has no dependency manifest; add any further Python packages required by your local setup to a requirements file. Keep private configuration out of source control.
