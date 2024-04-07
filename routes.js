const fs = require("fs");

const requestHandler = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter text</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1].split("+").join(" ");
      fs.writeFile("message.txt", message, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

// =-=-=-=-=-=-Ways of exporting the functions=-=-=-=-=-=

// 1) METHOD 1
// module.exports = { handler: requestHandler, usage: "Using the routing" };

// 2) METHOD 2
// module.exports.handler = requestHandler;
// module.exports.usage = "Using the routing";

// 3) METHOD 3
// exports.handler = requestHandler;
// exports.usage = "Using the routing";

// 4) METHOD 4
module.exports = requestHandler;
