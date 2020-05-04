const request = require("supertest");
const app = require("../app");
const { teardownMongoose } = require("../utils/teardownMongoose");
const Person = require("../models/person");

afterAll(async () => {
  await teardownMongoose();
});

beforeEach(async () => {
  const testPerson = {
    id: "1111",
    name: "test person",
    grossIncome: 1000,
    netIncome: 800,
  };
  await Person.create(testPerson);
});

afterEach(async () => {
  await Person.deleteMany();
});

describe("person.route", () => {
  it("should return all people when submit get request", async () => {
    const { body: peopleList } = await request(app)
      .get("/v1/person")
      .expect(200);
    expect(peopleList[0]).toMatchObject({ id: "1111", name: "test person" });
  });

  it("should create a person successfully when submit post request", async () => {
    const newPerson = {
      name: "test person 2",
      grossIncome: 1100,
      netIncome: 990,
    };
    const { body: person } = await request(app)
      .post("/v1/person")
      .send(newPerson)
      .expect(201);
    expect(person).toMatchObject(newPerson);

    const { body: peopleList } = await request(app)
      .get("/v1/person")
      .expect(200);
    expect(peopleList[1]).toMatchObject(newPerson);
  });
});
