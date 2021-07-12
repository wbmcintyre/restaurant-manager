import { logout } from "../../../../lib/auth";

async function handler(req, res) {
  if (req.method === "GET") {
    //reset jwt to log user out
    logout(req, res);
  } else {
    res.status(422).json({ message: "This path is only for GET requests" });
  }
}

export default handler;
