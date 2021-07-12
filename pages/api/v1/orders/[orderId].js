import { getOne } from "../../../../lib/handlerFactory";
import { verifyAdmin } from "../../../../lib/auth";

async function orderIdHandler(req, res) {
  if (req.query.orderId) {
    const verifiedAdmin = await verifyAdmin(req);
    if (req.method === "GET") {
      if (!verifiedAdmin) {
        res.status(401).json({
          message: "Invalid credentials",
        });
        return;
      }
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
