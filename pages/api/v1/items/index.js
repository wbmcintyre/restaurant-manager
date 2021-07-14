import {
  getAll,
  createOne,
  setupFormDataParser,
} from "../../../../lib/handlerFactory";
import { verifyAdmin } from "../../../../lib/auth";
import { assignPhoto } from "../../../../lib/handlerFactory";

async function itemHandler(req, res) {
  const verifiedAdmin = await verifyAdmin(req);
  if (req.method === "POST") {
    if (!verifiedAdmin) {
      res.status(401).json({
        message: "Improper credentials",
      });
      return;
    }
    await setupFormDataParser(req, async () => {
      const item = await createOne(
        req,
        res,
        "items",
        ["name", "description", "price", "category"],
        "name"
      );
    });
  } else if (req.method === "GET") {
    await getAll(req, res, "items", {});
  } else {
    res.status(422).json({
      message: "This path is only for GET and POST requests",
    });
  }
}

export default itemHandler;

export const config = {
  api: {
    bodyParser: false,
  },
};
