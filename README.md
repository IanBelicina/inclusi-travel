# InclusiTravel

InclusiTravel is the ultimate destination for individuals who want to make informed choices when it comes to accessible locations. Whether you're a person with disabilities seeking accessible venues or a compassionate advocate for inclusivity, InclusiTravel empowers you to leave your mark and shape a more inclusive world.

## How To Run This App

If the application is still deployed at the time of reading this README, the application can be accessed at the below link

- https://inclusitravel.gitlab.io/module3-project-gamma/

If the application is no longer deployed the following software is required to run the application:

- Git
- Docker
- Node.js

After confirming you have the needed software to run the application, follow the below steps to get the application running on your local machine.

- Fork and clone this repository onto your computer.
- Build the project and run the project in docker using the following commands:
  - docker volume create postgres-data
  - docker compose build
  - docker compose up
- Open Docker desktop to confirm all containers are running.
- Open the site on your browser at localhost:3000

##SQL table Relationships
![SQL Table Relationship](image.png)

## Comments

The Comments model in this application provides a set of CRUD APIs, allowing users to seamlessly manage and interact with comments associated with various content. These APIs empower users to Create new comments, Read existing comments, Update comment information, and Delete comments as needed. Below is a table of how you can access these endpoints and examples of expected input and output json responses.

| Action                     | Method | URL                                                 |
| -------------------------- | ------ | --------------------------------------------------- |
| Get all review comments    | GET    | http://localhost:8000/reviews/{review_id}/comments  |
| Get comment                | GET    | http://localhost:8000/reviews/comments/{comment_id} |
| Update comment (protected) | PUT    | http://localhost:8000/reviews/comments/{comment_id} |
| Delete comment (protected) | DELETE | http://localhost:8000/reviews/comments/{comment_id} |
| Create comment (protected) | POST   | http://localhost:8000/reviews/comments              |

### Get all review comments

Input: review_id
Response Body:

```
[
  {
    "id": 0,
    "account_id": 0,
    "content": "string",
    "created_on": "2023-09-06",
    "review": {
      "id": 0,
      "location_id": {
        "id": 0,
        "address": "string",
        "city": "string",
        "state": "string",
        "location_name": "string",
        "picture": "string",
        "updated_on": "2023-09-06"
      },
      "account_id": {
        "id": 0,
        "first_name": "string",
        "last_name": "string",
        "date_of_birth": "2023-09-06",
        "email": "string",
        "username": "string"
      },
      "rating": 0,
      "body": "string",
      "created_on": "2023-09-06"
    }
  }
]
```

### Get comment

Input: comment_id
Response Body:

```
{
  "id": 0,
  "account_id": 0,
  "content": "string",
  "created_on": "2023-09-06",
  "review": {
    "id": 0,
    "location_id": {
      "id": 0,
      "address": "string",
      "city": "string",
      "state": "string",
      "location_name": "string",
      "picture": "string",
      "updated_on": "2023-09-06"
    },
    "account_id": {
      "id": 0,
      "first_name": "string",
      "last_name": "string",
      "date_of_birth": "2023-09-06",
      "email": "string",
      "username": "string"
    },
    "rating": 0,
    "body": "string",
    "created_on": "2023-09-06"
  }
}
```

### Update comment (protected)

Input: comment_id and below request body

```
{
  "account_id": 0,
  "review_id": 0,
  "content": "string",
  "created_on": "2023-09-06"
}
```

Response Body:

```
{
  "id": 0,
  "account_id": 0,
  "content": "string",
  "created_on": "2023-09-06",
  "review": {
    "id": 0,
    "location_id": {
      "id": 0,
      "address": "string",
      "city": "string",
      "state": "string",
      "location_name": "string",
      "picture": "string",
      "updated_on": "2023-09-06"
    },
    "account_id": {
      "id": 0,
      "first_name": "string",
      "last_name": "string",
      "date_of_birth": "2023-09-06",
      "email": "string",
      "username": "string"
    },
    "rating": 0,
    "body": "string",
    "created_on": "2023-09-06"
  }
}
```

### Delete comment (protected)

Input: comment_id
Response: True

### Create comment (protected)

Request Body:

```
{
  "account_id": 0,
  "review_id": 0,
  "content": "string",
  "created_on": "2023-09-06"
}
```

Response Body:

```
{
  "id": 0,
  "account_id": 0,
  "content": "string",
  "created_on": "2023-09-06",
  "review": {
    "id": 0,
    "location_id": {
      "id": 0,
      "address": "string",
      "city": "string",
      "state": "string",
      "location_name": "string",
      "picture": "string",
      "updated_on": "2023-09-06"
    },
    "account_id": {
      "id": 0,
      "first_name": "string",
      "last_name": "string",
      "date_of_birth": "2023-09-06",
      "email": "string",
      "username": "string"
    },
    "rating": 0,
    "body": "string",
    "created_on": "2023-09-06"
  }
}
```

### Reviews

Below you will find all the endpoints and examples of expected input and output JSON responses for the reviews model. These endpoints allow CRUD operations for the reviews.

| Action                    | Method | URL                                |
| ------------------------- | ------ | ---------------------------------- |
| Get all accounts          | GET    | http://localhost:8000/reviews      |
| Get review                | GET    | http://localhost:8000/reviews/{id} |
| Update review (protected) | PUT    | http://localhost:8000/reviews/{id} |
| Delete review (protected) | DELETE | http://localhost:8000/reviews/{id} |
| Create review (protected) | POST   | http://localhost:8000/reviews      |

### Get all reviews

```
Response Body:

[
  {
    "id": 0,
    "location_id": {
      "id": 0,
      "address": "string",
      "city": "string",
      "state": "string",
      "location_name": "string",
      "picture": "string",
      "updated_on": "2023-09-06"
    },
    "account_id": {
      "id": 0,
      "first_name": "string",
      "last_name": "string",
      "date_of_birth": "2023-09-06",
      "email": "string",
      "username": "string"
    },
    "rating": 0,
    "body": "string",
    "created_on": "2020-02-12"
  }
]
```

### Get review

Input: id

```
Response Body:

{
  "id": 0,
  "location_id": {
    "id": 0,
    "address": "string",
    "city": "string",
    "state": "string",
    "location_name": "string",
    "picture": "string",
    "updated_on": "2023-09-07"
  },
  "account_id": {
    "id": 0,
    "first_name": "string",
    "last_name": "string",
    "date_of_birth": "2023-09-07",
    "email": "string",
    "username": "string"
  },
  "rating": 0,
  "body": "string",
  "created_on": "2020-02-12"
}
```

### Update review (protected)

Input: id

```
Request body:
{
  "location_id": 0,
  "account_id": 0,
  "rating": 0,
  "body": "string",
  "created_on": "2023-09-07"
}

Response Body:
{
  "id": 0,
  "location_id": {
    "id": 0,
    "address": "string",
    "city": "string",
    "state": "string",
    "location_name": "string",
    "picture": "string",
    "updated_on": "2023-09-07"
  },
  "account_id": {
    "id": 0,
    "first_name": "string",
    "last_name": "string",
    "date_of_birth": "2023-09-07",
    "email": "string",
    "username": "string"
  },
  "rating": 0,
  "body": "string",
  "created_on": "2022-01-01"
}
```

### Delete review

Input: id

```
Response Body:
true
```

### Create review (protected)

```
Request Body:
{
  "location_id": 0,
  "account_id": 0,
  "rating": 0,
  "body": "string",
  "created_on": "2023-09-07"
}

Response Body:

{
  "id": 0,
  "location_id": {
    "id": 0,
    "address": "string",
    "city": "string",
    "state": "string",
    "location_name": "string",
    "picture": "string",
    "updated_on": "2023-09-07"
  },
  "account_id": {
    "id": 0,
    "first_name": "string",
    "last_name": "string",
    "date_of_birth": "2023-09-07",
    "email": "string",
    "username": "string"
  },
  "rating": 0,
  "body": "string",
  "created_on": "2023-09-07"
}
```

## Accounts

Below you will find all the endpoints and examples of expected input and output JSON responses for the accounts model. These endpoints allow CRUD operations for the accounts.

| Action           | Method | URL                                       |
| ---------------- | ------ | ----------------------------------------- |
| Get all accounts | GET    | http://localhost:8000/accounts            |
| Get account      | GET    | http://localhost:8000/accounts/{username} |
| Create account   | POST   | http://localhost:8000/accounts            |

### Get all accounts

Input: Blank

Response Body:

```
{
  "accounts": [
    {
      "id": 1,
      "first_name": "Bob",
      "last_name": "Ross",
      "date_of_birth": "1942-10-29",
      "email": "bobross@gmail.com",
      "username": "bobpaints"
    },
    {
      "id": 2,
      "first_name": "Stephen",
      "last_name": "Curry",
      "date_of_birth": "1988-03-14",
      "email": "scurry@gmail.com",
      "username": "stephshoots"
    }
  ]
}

```

### Get account

Request Body:

Username: Stephshoots

Response Body:

```
{
  "id": 2,
  "first_name": "Stephen",
  "last_name": "Curry",
  "date_of_birth": "1988-03-14",
  "email": "scurry@gmail.com",
  "username": "stephshoots"
}

```

### Create account

Request Body:

```
{
  "first_name": "string",
  "last_name": "string",
  "date_of_birth": "2023-09-07",
  "email": "string",
  "username": "string",
  "password": "string"
}

```

Response Body:

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5N2I2NWM0My0zY2I5LTQwZjItODc3Mi04NDM3OTVjNTMyNjEiLCJleHAiOjE2OTQxMzM0MzMsInN1YiI6ImtjaDRuZyIsImFjY291bnQiOnsiaWQiOjU1LCJmaXJzdF9uYW1lIjoiS2F0ZWx5biIsImxhc3RfbmFtZSI6IkNoYW5nIiwiZGF0ZV9vZl9iaXJ0aCI6IjIwMjMtMDktMDciLCJlbWFpbCI6ImtjaGFuZ0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImtjaDRuZyJ9fQ.M-B2bZHOEd8XKa_1AnkuQhePCvYFyDReH55WVwOk3Bg",
  "token_type": "Bearer",
  "account": {
    "id": 55,
    "first_name": "Katelyn",
    "last_name": "Chang",
    "date_of_birth": "2023-09-07",
    "email": "kchang@gmail.com",
    "username": "kch4ng"
  }
}

```

### Accessibility

Below you will find all the endpoints and examples of expected input and output JSON responses for the accessibility model. These endpoints allow CRUD operations for the accessibilities.

| Action                           | Method | URL                                 |
| -------------------------------- | ------ | ----------------------------------- |
| Get all accessibilities          | GET    | http://localhost:8000/accessibility |
| Create accessibility (protected) | POST   | http://localhost:8000/accessibility |

### Get accessibility

Input: Blank

Response Body:

```
{
  "accessibilities": [
    {
      "id": 1,
      "name": "Ramps"
    },
    {
      "id": 2,
      "name": "Handicap Parking"
    },
    {
      "id": 3,
      "name": "crutches"
    },
    {
      "id": 4,
      "name": "Elevators"
    },
    {
      "id": 5,
      "name": "Escalators"
    }
  ]
}

```

### Create accessibility (protected)

Request Body:

```
{
  "name": "string"
}

```

Response Body:

```
    {
      "id": 1,
      "name": "Ramps"
    }

```
