import {
  getOne,
  updateByBody,
  deleteOne,
} from "../../../../lib/handlerFactory";

async function itemIdHandler(req, res) {
  const verifiedAdmin = await verifyAdmin(req);
  if (req.method === "PATCH") {
    if (!verifiedAdmin) {
      res.status(401).json({
        message: "Please make sure you are signed into your account",
      });
      return;
    }

    try {
      await updateByBody(
        req,
        res,
        "items",
        ["name", "description", "price", "category"],
        {
          _id: req.query.itemId,
        }
      );
      //check for image being sent -> add image to server -> add image directory to filteredBody[image] before updating
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong when updating in the database",
      });
      return;
    }
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
