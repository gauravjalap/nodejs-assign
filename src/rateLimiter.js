const rateLimits = {};

function checkRateLimit(userId) {
  const now = Date.now();
  if (!rateLimits[userId]) {
    rateLimits[userId] = {
      perSecond: { count: 0, reset: now + 1000 },
      perMinute: { count: 0, reset: now + 60000 },
    };
  }

  const userLimits = rateLimits[userId];

  if (now > userLimits.perSecond.reset) {
    userLimits.perSecond = { count: 0, reset: now + 1000 };
  }
  if (now > userLimits.perMinute.reset) {
    userLimits.perMinute = { count: 0, reset: now + 60000 };
  }

  if (userLimits.perSecond.count < 1 && userLimits.perMinute.count < 20) {
    userLimits.perSecond.count++;
    userLimits.perMinute.count++;
    return true;
  }

  return false;
}

module.exports = { checkRateLimit };
