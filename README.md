# Fake Social App
This is a fake social app and implement the following features

- Register/Login users
- Create post
- Comment post
- Like post
- Show list of post

Use MERNG stack:

- MongoDB
- React/Semantic UI for frontend
- Graphql/Apollo-Server for backend

## Containers
### db
It is the mongo database container. The database name is: __social_db__

The following collections are defined:

User
```
{
  username: String,
  password: String,
  email: String,
  createAt: String
}
```

Post
```
{
  body: String,
  username: String,
  createAt: String,
  comments: [
    {
      body: String,
      username: String,
      createAt: String,
    },
  ],
  likes: [{
    username: String,
    createAt: String,
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
}
```

### backend
It is the Apollo server container which expose the following queries and mutations:

Query
- getPosts
- getPost

Mutation
- register
- login
- createPost
- deletePost
- createComment
- deleteComment
- likePost
- newPost

### frontend
It is React client which provides an UI and consume the Graphql from backend.

Some functionalities are:
- Register and Login user
- Create/Delete posts
- Create/Delete comments
- Like posts

### How to run it?
Create an .env file with the following content:
```
MONGO_USERNAME
MONGO_PASSWORD
MONGO_HOSTNAME
MONGO_PORT
MONGO_DB
BACKEND_PORT
SECRET_KEY
```

The entire application can be run with a single terminal command:

```
docker-compose -up -d
```

After run this command the following will have been created:

Containers:
- db
- backend
- frontend

Volumes:
- social_app_dbdata
- social_app_node_modules

Network
- social_app_app-network

If you want to stop it, run the following command:

```
docker-compose down
```

