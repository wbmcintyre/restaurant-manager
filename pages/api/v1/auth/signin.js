import { connectToDatabase } from "../../../../lib/db";
import { createAndSendToken, verifyPassword } from "../../../../lib/auth";

async function signInHandler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || email.trim() === "" || !password || password.trim() === "") {
      res.status(422).json({ message: "Empty values are not accepted" });
      return;
    }

    if (!email.includes("@")) {
      res.status(422).json({ message: "Invalid Email" });
      return;
    }

    try {
      const client = await connectToDatabase();
      const database = client.db();
      const user = await database.collection("users").findOne({ email });

      if (!user) {
        res.status(422).json({ message: "Incorrect email or password." });
        return;
      }

      const isVerified = await verifyPassword(password, user.password);

      if (!isVerified) {
        res.status(422).json({ message: "Incorrect email or password." });
        return;
      }
      createAndSendToken(user, 200, req, res);

      client.close();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Unable to connect to database. Please try again later.",
      });
      return;
    }
  } else {
    res.status(422).json({ message: "This path is only for POST requests" });
  }
}

export default signInHandler;
