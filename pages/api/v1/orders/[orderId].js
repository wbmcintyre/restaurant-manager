import { getOne } from "../../../../lib/handlerFactory";

async function orderIdHandler(req, res) {
  if (req.query.itemId) {
    if (req.method === "GET") {
      await getOne(req, res, "orders", { _id: req.query.orderId });
    } else {
      res.status(422).json({
        message: "This path is only for GET requests",
      });
    }
  } else {
    res.status(422).json({ message: "Invalid query sent" });
  }
}

export default orderIdHandler;
