import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, expect, it, describe } from "vitest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    );
  });

});