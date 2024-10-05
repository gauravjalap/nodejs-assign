const axios = require("axios");

const API_URL = "http://localhost:3000/task";

describe("Task API", () => {
  test("Should process a single task", async () => {
    const response = await axios.post(API_URL, { user_id: "123" });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Task processed");
  });

  test("Should queue tasks when rate limit is exceeded", async () => {
    const responses = await Promise.all(
      Array(5)
        .fill()
        .map(() => axios.post(API_URL, { user_id: "123" }))
    );

    const messages = responses.map((r) => r.data.message);
    expect(messages).toContain("Task queued");
  });

  test("Should process tasks for different users independently", async () => {
    const response1 = await axios.post(API_URL, { user_id: "456" });
    const response2 = await axios.post(API_URL, { user_id: "789" });

    expect(response1.data.message).toBe("Task processed");
    expect(response2.data.message).toBe("Task processed");
  });

  test("Should hit per-minute rate limit", async () => {
    const responses = await Promise.all(
      Array(25)
        .fill()
        .map(() => axios.post(API_URL, { user_id: "123" }))
    );

    const queuedCount = responses.filter(
      (r) => r.data.message === "Task queued"
    ).length;
    expect(queuedCount).toBeGreaterThan(0);
  });
});
