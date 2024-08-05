# Steps

### clone project first

````bash
git clone git@github.com:NZRicky/leave-management.git
````

## Backend: 

###run composer to install packages (use PHP 8.3) 

````bash
cd leave-management
composer install
````

### create database name & database setup

update .env file to match your database setup, such as database name, username, password

such as:

````php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=leave-management
DB_USERNAME=root
DB_PASSWORD=abcd1234
````

### run artisan migrate to create table
````bash
php artisan migrate
````

### seed data
````bash
php artisan db:seed 
````

### start server
````bash
php artisan serve
````

open http://127.0.0.1:8000/api/leave-requests

you should a list of leave requests json data


## Frontend

### run npm to install packages (use node v20.9.0)

we need to run `npm install` under `leave-managment` folder and it's sub folder `frontend` to install `vite`

````bash
cd leave-management
npm install

cd frontend
npm install
````
### start vite
````bash
cd frontend
npm run dev
````
if you dont' specify port, you default port should be 5173

## Test

open http://localhost:5173/, you will see the home page (list of leave reques)

---

## Unit Test

### run unit test and feature test

````bash
php artisan test
````
