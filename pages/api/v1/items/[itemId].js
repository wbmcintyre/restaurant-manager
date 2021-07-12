import {
  getOne,
  updateByBody,
  deleteOne,
} from "../../../../lib/handlerFactory";

async function itemIdHandler(req, res) {
  if (req.query.itemId) {
    if (req.method === "GET") {
      await getOne(req, res, "items", { _id: req.query.itemId });
    } else if (req.method === "PATCH") {
      await updateByBody(
        req,
        res,
        "items",
        ["name", "description", "price", "category"],
        { _id: req.query.itemId }
      );
    } else if (req.method === "DELETE") {
      await deleteOne(req, res, "items", {
        _id: req.query.itemId,
      });
    } else {
      res.status(422).json({
        message: "This path is only for GET, PATCH, and DELETE requests",
      });
    }
  } else {
    res.status(422).json({ message: "Invalid query sent" });
  }
}

export default itemIdHandler;
