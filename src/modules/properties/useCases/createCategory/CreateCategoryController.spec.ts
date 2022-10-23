import request from "supertest";

import { PrismaClient } from "@prisma/client";
import { app } from "@shared/infra/http/app";

const prisma = new PrismaClient();

let refreshToken: string;

describe("Category controller operations", () => {
  beforeAll(async () => {
    await prisma.$queryRaw`DELETE FROM "Category"`;

    const loginResponse = await request(app).post("/users/auth").send({
      email: "admin@test.com",
      password: "123",
    });

    ({ refreshToken } = loginResponse.body);
  });

  it("Should be able to list categories", async () => {
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
  });

  it("Should be able to create a category", async () => {
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category name TEST",
        description: "Category description TESTE",
      })
      .set({
        Authorization: `Bearer ${refreshToken}`,
      });

    expect(response.status).toBe(201);
  });

  it("Should NOT be able to create a category with same name", async () => {
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category name TEST",
        description: "Category description TESTE",
      })
      .set({
        Authorization: `Bearer ${refreshToken}`,
      });

    expect(response.status).toBe(400);
  });
});
