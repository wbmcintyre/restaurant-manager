import fs from "fs";
import path from "path";

function imageHandler(req, res) {
  if (req.method === "GET") {
    try {
      const imageId = req.query.imageId;
      const filePath = path.resolve(".", `img/users/${imageId}`);
      fs.readFile(filePath, (err, data) => {
        res.setHeader("Content-Type", "image/jpg");
        res.send(data);
      });
    } catch (err) {
      res.status(500).json({ message: "Unable to find file" });
    }
  } else {
    res.status(422).json({
      message: "This path is only for GET requests",
    });
  }
}

export default imageHandler;
