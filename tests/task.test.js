const request = require("supertest");
const app = require("../src/app");

describe("Task API", () => {
  it("should create a task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });
});
