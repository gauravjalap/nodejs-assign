const { checkRateLimit } = require("./rateLimiter");
const { getNextTask, queues } = require("./taskQueue");
const { task } = require("./task");

function startTaskProcessor() {
  setInterval(() => {
    Object.keys(queues).forEach((userId) => {
      if (checkRateLimit(userId)) {
        const taskData = getNextTask(userId);
        if (taskData) {
          task(userId);
        }
      }
    });
  }, 1000); 
}

module.exports = { startTaskProcessor };
