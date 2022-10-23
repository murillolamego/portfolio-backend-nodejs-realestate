import request from "supertest";

import { app } from "@shared/infra/http/app";

describe("User controller operations", () => {
  it("Should be able to authenticate user", async () => {
    const response = await request(app).post("/users/auth").send({
      email: "admin@test.com",
      password: "123",
    });

    expect(response.status).toBe(200);
  });
});
