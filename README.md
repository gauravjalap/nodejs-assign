# User Task Queuing with Rate Limiting

This project implements a Node.js API cluster with task queueing and rate limiting.

## Features

- Node.js API cluster with two worker processes
- In-memory rate limiting (1 task per second, 20 tasks per minute per user)
- In-memory task queueing
- Logging of completed tasks

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

## Usage

Send a POST request to `http://localhost:3000/task` with a JSON body:

```json
{
  "user_id": "123"
}
```

The server will process or queue the task based on the current rate limits.

For your ease I have created a `api.test.js` file, so you can use that one for automated requests:

```
npm test
```

> NOTE: Make sure you are in root directory while running the above command.

## Rate Limits

- 1 task per second per user
- 20 tasks per minute per user

Requests exceeding these limits will be queued and processed when possible.

## Logs

Completed tasks are logged in `logs/task-logs.log`.
