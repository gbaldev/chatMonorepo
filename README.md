# Chat App - Native Modules Demo in React Native

## Project Overview

This repository demonstrates the implementation of native modules in a React Native project. The project chose a straightforward example: managing local notification permissions.

## Key Features

- Demonstrates native module implementation in React Native
- Focuses on local notification permission handling
- Includes a simple but effective server using socket connections
- Showcases background task execution, particularly for iOS

## iOS-Specific Implementation

For iOS, an additional native module has been implemented to enable background task execution. This allows the app to perform background tasks, similar to Android's native capabilities. This implementation is crucial for maintaining an active connection with the server, ensuring continuous message reception.

**Note:** While this demonstrates the concept, it's important to understand that background tasks in iOS are intended for specific purposes and have execution limitations. In a production environment, alternative solutions like remote notifications would be more appropriate. Please refer to the module documentation for more details.

## Server Project

The application communicates through a simple yet functional server that uses sockets for connection. This server handles:

- User registration
- Subsequent message management

The persistent connection is essential for real-time message reception.

## Getting Started

1. Start the server:
   - Follow the instructions in the server project's README

2. Initialize the application:
   - The apps depend on socket connections to function
   - Follow the instructions in the app project's README

## Important Considerations

- The background task implementation in iOS is for demonstration purposes
- In a real-world scenario, consider using remote notifications or other more suitable solutions for persistent connections
- Understand the limitations of background tasks in iOS

This project exemplifies the ability to tackle complex mobile development challenges, implement platform-specific features, and create cohesive full-stack mobile solutions.

## Demonstration Video of usage and iOS Background Task Limitations

In the video, you can see the mentioned limitations of background tasks on iOS, where in some scenarios the OS decides to terminate them. This behavior is expected, which is why in some cases the tasks continue and in others they are suspended. This is not the case with Android, which generally allows background tasks to continue running.

<img width="1507" alt="image" src="https://github.com/user-attachments/assets/d06a6a6d-15ae-45fb-9ed0-3bec4829dc7c">

[Video](https://drive.google.com/file/d/1gbTlagfWyU18DfR8L6v9MgvLI3sryoRJ/view?usp=sharing)
