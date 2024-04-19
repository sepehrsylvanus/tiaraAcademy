# 🌟 Tiara Academy Server Documentation 🌟

## Introduction

This document serves as a guide to understand the server actions and APIs implemented in Tiara Academy's website. Below, you will find details on each action, its purpose, and usage.

## 🚀 Server Actions

### getToken

🔐 Obtain an authentication token.

### verifyToken

🔍 Verify the authenticity of a token.

### retrieveUsers

👩‍💻 Retrieve user data from the database.

### postWriting

📝 Post written content.

### postVideo

🎥 Post video content.

### deleteVideo

🗑️ Delete a video.

### getSingleClass

📚 Retrieve details of a class.

### postWritingFile

📄 Post a writing file.

## 📡 APIs

### Classes

#### Make new class

- **Endpoint:** `/api/classes`
- **Method:** POST
- **Purpose:** Create a new class.

#### Retrieve all classes

- **Endpoint:** `/api/classes`
- **Method:** GET
- **Purpose:** Retrieve all classes.

#### Delete single class

- **Endpoint:** `/api/classes/:id`
- **Method:** DELETE
- **Purpose:** Delete a specific class by ID.

### Signin

#### Sign in

- **Endpoint:** `/api/signin`
- **Method:** POST
- **Purpose:** Sign in a user.

### Signout

#### Sign out

- **Endpoint:** `/api/signout`
- **Method:** GET
- **Purpose:** Sign out a user.

### Users

#### Change role

- **Endpoint:** `/api/users/:id`
- **Method:** PUT
- **Purpose:** Change the role of a user by ID.

#### Signup new user

- **Endpoint:** `/api/users`
- **Method:** POST
- **Purpose:** Register a new user.

### Writings

#### Make new writing through website

- **Endpoint:** `/api/writings`
- **Method:** POST
- **Purpose:** Create a new writing through the website.

#### Retrieve all writings

- **Endpoint:** `/api/writings`
- **Method:** GET
- **Purpose:** Retrieve all writings.

## 🎉 Conclusion

This README provides an overview of the server actions and APIs available in Tiara Academy's website. For detailed usage instructions, refer to the corresponding sections above.
