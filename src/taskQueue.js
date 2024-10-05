const queues = {};

function addTaskToQueue(userId, taskData) {
  if (!queues[userId]) {
    queues[userId] = [];
  }
  queues[userId].push(taskData);
}

function getNextTask(userId) {
  if (queues[userId] && queues[userId].length > 0) {
    return queues[userId].shift();
  }
  return null;
}

module.exports = { addTaskToQueue, getNextTask, queues };
