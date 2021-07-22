import { verifyJWT } from "../../../../lib/auth";

async function verifyHandler(req, res) {
  if (req.method === "POST") {
    try {
      const user = await verifyJWT(req);
      if (!user) {
        res.status(202).json({ message: "Unable to verify user" });
        return;
      }

      res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          cart: user.cart,
          image: user.image,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Unable to connect to database. Please try again later.",
      });
      return;
    }
  } else {
    res.status(422).json({ message: "This path is only for POST requests" });
  }
}

export default verifyHandler;
