const request = require("supertest");
const app = require("../app");
const Finrecord = require("../models/finrecord");
const jwt = require("jsonwebtoken");
const { teardownMongoose } = require("../utils/teardownMongoose");

afterAll(async () => {
  await teardownMongoose();
});

beforeEach(async () => {
  const testFinrecord = {
    person: "1111",
    title: "Base",
    amount: 200,
    category: "Expenditure",
    classification: "Expenditure",
  };
  await Finrecord.create(testFinrecord);
});

afterEach(async () => {
  await Finrecord.deleteMany();
});

describe("finrecord.route", () => {
  it("should return fin record when get finrecord", async () => {
    const { body: finrecordList } = await request(app)
      .get("/v1/finrecords")
      .send({ person: "1111" })
      .expect(200);
    expect(finrecordList[0]).toMatchObject({
      person: "1111",
      title: "Base",
    });
  });

  it("should create a record when submit a normal spending record", async () => {
    const newFinrecord = {
      person: "1111",
      title: "Spending",
      amount: 50,
      category: "Expenditure",
      classification: "Expenditure",
    };
    const { body: createdFinrecord } = await request(app)
      .post("/v1/finrecords")
      .send(newFinrecord)
      .expect(201);
    expect(createdFinrecord).toMatchObject(newFinrecord);

    const { body: finrecordList } = await request(app)
      .get("/v1/finrecords")
      .send({ person: "1111" })
      .expect(200);
    expect(finrecordList[1]).toMatchObject({
      person: "1111",
      title: "Spending",
    });
  });
});
