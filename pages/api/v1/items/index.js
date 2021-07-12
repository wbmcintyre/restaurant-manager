import { getAll, createOne } from "../../../../lib/handlerFactory";

async function itemHandler(req, res) {
  if (req.method === "POST") {
    await createOne(
      req,
      res,
      "items",
      ["name", "description", "price", "category"],
      "name"
    );
    //check for image being sent -> add image to server -> add image directory to filteredBody[image] before updating
  } else if (req.method === "GET") {
    await getAll(req, res, "items");
  } else {
    res
      .status(422)
      .json({ message: "This path is only for POST and GET requests" });
  }
}

export default itemHandler;
