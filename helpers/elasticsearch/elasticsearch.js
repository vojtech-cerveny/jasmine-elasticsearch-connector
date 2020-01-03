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
  jasmineStarted: function(suiteInfo) {},
  suiteStarted: function(result) {},
  specStarted: function(result) {},
  specDone: function(result) {},

  suiteDone: async function(result) {
    await sendResultToElastic(result);
  },

  jasmineDone: function(result) {
    console.log("Finished suite: " + result.overallStatus);
  }
};

exports.myReporter = myReporter;
