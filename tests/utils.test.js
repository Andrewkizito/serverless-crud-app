//This tests my functions in the lambda layer
const utils = require("../src/functions/layers/utils/nodejs/utils");

let a,
  b = null;

beforeEach(() => {
  a = {
    SK: "2HJg5WTUHqPUAz6Veasfolrspuw",
  };

  b = {
    SK: "2HJeDP8TLDxYs9C2SvU5UJRfFZH",
  };
  date = "2022-11-10T06:42:00.108Z";
});

afterEach(() => {
  a, (b = null);
});

describe("Testing My Lambda Function Utilities", () => {
  test("Testing sortProjects Function", () => {
    expect(utils.sortProjects(a, b)).toEqual(-1);
    expect(utils.sortProjects(b, a)).toEqual(-1);
  });

  describe("Testing Date Generation", () => {
    const date = utils.generateDate();
    const keys = Object.keys(date);

    it("should include time", () => {
      expect(keys).toContain("time");
    });

    it("should include date", () => {
      expect(keys).toContain("date");
    });
  });
});
