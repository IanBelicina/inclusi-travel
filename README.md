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

| Action | Method | URL |
| -------------------------- | ------ | --------------------------------------------------- |
| Get all reviews | GET | http://localhost:8000/reviews |
| Get review | GET | http://localhost:8000/reviews/{id} |
| Update review (protected) | PUT | http://localhost:8000/reviews/{id} |
| Delete review (protected) | DELETE | http://localhost:8000/reviews/{id} |
| Create review (protected) | POST | http://localhost:8000/reviews |

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