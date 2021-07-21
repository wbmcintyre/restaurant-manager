import { connectToDatabase } from "../../../../lib/db";
import { createAndSendToken } from "../../../../lib/auth";
import { hashPassword } from "../../../../lib/auth";
import path from "path";

async function handler(req, res) {
  //User Sign UP
  if (req.method === "POST") {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (
      !email ||
      email.trim() === "" ||
      !name ||
      name.trim() === "" ||
      !password ||
      password.trim() === "" ||
      !confirmPassword ||
      confirmPassword.trim() === ""
    ) {
      res.status(422).json({ message: "Empty values are not accepted" });
      return;
    }

    if (!email.includes("@")) {
      res.status(422).json({ message: "Invalid Email" });
      return;
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      res
        .status(422)
        .json({ message: "Password must be greater than 8 characters" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(422).json({ message: "Passwords must match" });
      return;
    }

    try {
      const client = await connectToDatabase();
      const database = client.db();

      const existingUser = await database
        .collection("users")
        .findOne({ email });
      if (existingUser) {
        res.status(422).json({ message: "This email is already being used." });
        return;
      }

      const user = await database.collection("users").insertOne({
        email,
        name,
        password: await hashPassword(password),
        image: path.join(".", "img", "users", "default-user.png"),
        cart: {},
      });

      //send response with user and jwt for being signed in
      createAndSendToken(user.ops[0], 200, req, res);

      client.close();
    } catch (err) {
      res.status(500).json({
        message: "Unable to connect to database. Please try again later.",
      });
    }
  } else {
    res.status(422).json({ message: "This path is only for POST requests" });
  }
}

export default handler;
