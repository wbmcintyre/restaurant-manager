import { getOne, updateOne, deleteOne } from "../../../../lib/handlerFactory";
import { verifyAdmin } from "../../../../lib/auth";
import { setupFormDataParser } from "../../../../lib/handlerFactory";

async function itemIdHandler(req, res) {
  const verifiedAdmin = await verifyAdmin(req);
  if (req.method === "PATCH") {
    if (!verifiedAdmin) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }
    await setupFormDataParser(req, async () => {
      try {
        await updateOne(req, res, req.query.itemId, "items", [
          "name",
          "description",
          "price",
          "category",
          "priority",
        ]);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Something went wrong when updating the database",
        });
        return;
      }
    });
  } else if (req.method === "GET") {
    await getOne(req, res, "items", { _id: req.query.itemId });
  } else if (req.method === "DELETE") {
    if (!verifiedAdmin) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }
    await deleteOne(req, res, "items", { _id: req.query.itemId });
  } else {
    res.status(422).json({
      message: "This path is only for GET, PATCH, and DELETE requests",
    });
  }
}

export default itemIdHandler;

export const config = {
  api: {
    bodyParser: false,
  },
};
