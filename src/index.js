const express = require("express");
const cluster = require("cluster");
const numCPUs = 2;

const { checkRateLimit } = require("./rateLimiter");
const { addTaskToQueue } = require("./taskQueue");
const { startTaskProcessor } = require("./taskProcessor");
const { task } = require("./task");

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  app.use(express.json());

  app.post("/task", (req, res) => {
    const { user_id } = req.body;

    if (checkRateLimit(user_id)) {
      task(user_id);
      res.json({ message: "Task processed" });
    } else {
      addTaskToQueue(user_id, { timestamp: Date.now() });
      res.json({ message: "Task queued" });
    }
  });

  startTaskProcessor();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Worker ${process.pid} started on port ${PORT}`)
  );
}
