const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/app");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Task API", () => {
  it("should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });
});
