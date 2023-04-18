# Dummy Blog Server

This is a simple CRUD (Create, Read, Update, Delete) application built using the Express framework for Node.js. The application provides a RESTful API that allows users to create, retrieve, update, and delete blog posts.

This is NOT meant for production!

## Prerequisites

To run this application, you will need Node.js installed on your system. You can download the latest version of Node.js from the official website: https://nodejs.org/

## Important

Make sure you have a `data.json` file in the root of the project whose contents are `[]` when starting the server.

## Installation

Clone the repository to your local machine

Open a terminal and navigate to the project directory

Install the dependencies by running the following command:

```
npm install
```

## Usage

To start the application, run the following command in your terminal:

```
npm start
```

This will start the server on port 3001 by default. You can access the API using any REST client, such as a ReactJS app, Postman or cURL.

The following endpoints are available:

- GET /v1/api/posts - Retrieve a list of all blog posts.
- POST /v1/api/posts - Create a new blog post. Pass along in the body of the post an object with properties: title and content.
- GET /v1/api/posts/:id - Retrieve a specific blog post by ID.
- PATCH /v1/api/posts/:id - Update a specific blog post by ID. Pass along in the body of the post an object with at least one of the following properties: title and content
- DELETE /v1/api/posts/:id - Delete a specific blog post by ID.

## Error Handling

The application uses simple error handling to handle common errors such as missing fields or invalid IDs. If an error occurs, the API will return a JSON object with an "error" property containing a message describing the error.

## Future Improvements

This application is NOT intended for production use, and likely will never be. Purely for demonstration purposes
