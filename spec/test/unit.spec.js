
myReporter = require('../../helpers/elasticsearch/elasticsearch');
jasmine.getEnv().addReporter(myReporter.myReporter);

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});