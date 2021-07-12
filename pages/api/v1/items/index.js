import { getAll, createOne } from "../../../../lib/handlerFactory";
import { verifyAdmin } from "../../../../lib/auth";

async function itemHandler(req, res) {
  const verifiedAdmin = await verifyAdmin(req);
  if (req.method === "POST") {
    if (!verifiedAdmin) {
      res.status(401).json({
        message: "Improper credentials",
      });
      return;
    }
    await createOne(
      req,
      res,
      "items",
      ["name", "description", "price", "category"],
      "name"
    );
  } else if (req.method === "GET") {
    await getAll(req, res, "items", {});
  } else {
    res.status(422).json({
      message: "This path is only for GET and POST requests",
    });
  }
}
// async function itemHandler(req, res) {
//   if (req.method === "POST") {
//     await createOne(
//       req,
//       res,
//       "items",
//       ["name", "description", "price", "category"],
//       "name"
//     );
//     //check for image being sent -> add image to server -> add image directory to filteredBody[image] before updating
//   } else if (req.method === "GET") {
//     await getAll(req, res, "items");
//   } else {
//     res
//       .status(422)
//       .json({ message: "This path is only for POST and GET requests" });
//   }
// }

export default itemHandler;
