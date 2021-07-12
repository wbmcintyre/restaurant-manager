import { getAll } from "../../../../lib/handlerFactory";
import { verifyAdmin } from "../../../../lib/auth";

async function userHandler(req, res) {
  const verifiedAdmin = await verifyAdmin(req);
  if (req.method === "POST") {
    res.status(401).json({
      message: "Please use /api/v1/auth/signup to create new users",
    });
    return;
  } else if (req.method === "GET") {
    if (!verifiedAdmin) {
      res.status(401).json({
        message: "Improper credentials",
      });
      return;
    }
    await getAll(req, res, "users", { email: 1, name: 1, address: 1 });
  } else {
    res.status(422).json({
      message: "This path is only for GET requests",
    });
  }
}

export default userHandler;
