# EventPlanner

Clone repository

## Backend Setup

Create Virtual Environment and Activate

```
python -m venv venv  

source venv/bin/activate  # On Windows: venv/Scripts/activate
```

Install dependencies

```
cd backend

pip install django djangorestframework django-cors-headers

python manage.py runserver

python manage.py makemigrations events

python manage.py migrate  

python manage.py runserver
```


## Frontend Setup

Install dependencies

```
cd frontend

npm install axios react-router-dom react-icons react-timelines date-fns
```


Start React server

```
npm start
```
