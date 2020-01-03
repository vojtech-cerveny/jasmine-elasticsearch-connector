const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "NEEEEEEEED URL"
});

function sendResultToElastic(data) {
  console.log("✔️ SENDING DATA 🚮");
  return new Promise(resolve => {
    return client.index(
      {
        index: "yourIndexHere",
        body: {
          date: new Date(),
          data: data
        }
      },
      function(err, resp, status) {
        console.log(resp.statusCode);
        resolve();
      }
    );
  });
}

const myReporter = {
  jasmineStarted: function(suiteInfo) {
    console.log("Running suite with " + suiteInfo.totalSpecsDefined);
  },

  suiteStarted: function(result) {
    console.log(
      "Suite started: " +
        result.description +
        " whose full description is: " +
        result.fullName
    );
  },

  specStarted: function(result) {
    console.log(
      "Spec started: " +
        result.description +
        " whose full description is: " +
        result.fullName
    );
  },

  specDone: function(result) {
    console.log("Spec: " + result.description + " was " + result.status);

    for (var i = 0; i < result.failedExpectations.length; i++) {
      console.log("Failure: " + result.failedExpectations[i].message);
      console.log(result.failedExpectations[i].stack);
    }

    console.log(result.passedExpectations.length);
  },

  suiteDone: async function(result) {
    console.log("Suite: " + result.description + " was " + result.status);
    for (var i = 0; i < result.failedExpectations.length; i++) {
      console.log("Suite " + result.failedExpectations[i].message);
      console.log(result.failedExpectations[i].stack);
    }
    await sendResultToElastic(result);
  },

  jasmineDone: function(result) {
    console.log("Finished suite: " + result.overallStatus);
    for (var i = 0; i < result.failedExpectations.length; i++) {
      console.log("Global " + result.failedExpectations[i].message);
      console.log(result.failedExpectations[i].stack);
    }
  }
};

exports.myReporter = myReporter;
