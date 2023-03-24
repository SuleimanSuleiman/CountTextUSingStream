const express = require("express");
const cors = require("cors");
const { Readable,  Transform } = require("node:stream");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.get("/stream", (req, res) => {
  try {
      const text = req.query.text;
    if (!text) throw Error("text not found !!");
    const ReadText = Readable({
        read() {
        this.push(text);
        this.push(null);
      },
    });
    const transformText = Transform({
      transform(chunk, encoding, callback) {
        const count = chunk.toString().split("").length;
        callback(null,  count.toString());
      },
    });

    ReadText.pipe(transformText).pipe(res);
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(3000, () => {
  console.log("Server Running ....");
});
