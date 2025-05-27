const https = require("https");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.stringify(JSON.parse(event.body));

  const options = {
    hostname: "script.google.com",
    path: "/macros/s/AKfycby1WJhhQZxeWRnXNRd31hVXpy0zd9mErzHVmBkawZ2PSQ5hF-kpUveYJSKU-Dt_HK0k/exec",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        resolve({ statusCode: 200, body: "Success" });
      });
    });

    req.on("error", error => {
      resolve({ statusCode: 500, body: "Error: " + error.message });
    });

    req.write(data);
    req.end();
  });
};
