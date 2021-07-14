import { updateOne, getOne, deleteOne } from "../../../../lib/handlerFactory";
import { verifyAdmin, verifyJWT } from "../../../../lib/auth";
import { setupFormDataParser } from "../../../../lib/handlerFactory";

async function userIdHandler(req, res) {
  const verifiedUser = await verifyJWT(req);
  const verifiedAdmin = await verifyAdmin(req);
  if (req.method === "PATCH") {
    if (!verifiedUser) {
      res.status(401).json({
        message: "Please make sure you are signed into your account",
      });
      return;
    }
    //check if the user requesting the change is the user that is being changed
    if (
      String(req.query.userId) === String(verifiedUser._id) ||
      verifiedAdmin
    ) {
      await setupFormDataParser(req, async () => {
        try {
          await updateOne(req, res, req.query.userId, "users", [
            "name",
            "address",
            "email",
          ]);
        } catch (err) {
          console.log(err);
          res.status(500).json({
            message: "Something went wrong when updating the database",
          });
          return;
        }
      });
    } else {
      res.status(401).json({
        message: "The token sent does not match the account being updated",
      });
      return;
    }
  } else if (req.method === "GET") {
    if (!verifiedAdmin) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }
    await getOne(req, res, "users", { _id: req.query.userId });
  } else if (req.method === "DELETE") {
    if (!verifiedAdmin) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }
    await deleteOne(req, res, "users", { _id: req.query.userId });
  } else {
    res.status(422).json({
      message: "This path is only for GET, PATCH, and DELETE requests",
    });
  }
}

export default userIdHandler;

export const config = {
  api: {
    bodyParser: false,
  },
};
