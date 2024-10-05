const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "logs/task-logs.log" })],
});

function task(user_id) {
  const message = `${user_id}-task completed at-${Date.now()}`;
  console.log(message);
  logger.info(message);
}

module.exports = { task };
