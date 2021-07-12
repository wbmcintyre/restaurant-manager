import { getAll, createOne } from "../../../../lib/handlerFactory";
import { verifyAdmin } from "../../../../lib/auth";

async function orderHandler(req, res) {
  const verifiedAdmin = await verifyAdmin(req);
  if (req.method === "POST") {
    await createOne(req, res, "orders", [
      "userId",
      "address",
      "items",
      "totalQuantity",
      "totalPrice",
      "creationDate",
      "isActive",
    ]);
  } else if (req.method === "GET") {
    if (!verifiedAdmin) {
      res.status(401).json({
        message: "Improper credentials",
      });
      return;
    }
    await getAll(req, res, "orders", {});
  } else {
    res.status(422).json({
      message: "This path is only for GET and POST requests",
    });
  }
}

export default orderHandler;
