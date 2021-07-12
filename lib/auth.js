import { hash, compare } from "bcryptjs";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { getOneNoResponse } from "./handlerFactory";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  return compare(password, hashedPassword);
}

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createAndSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookies = new Cookies(req, res);

  cookies.set("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    token,
    user: user.email,
  });
};

export const verifyJWT = async (req) => {
  let token;
  if (req.headers.authorization) {
    if (req.headers.authorization.split(" ")[0] === "Bearer") {
      token = req.headers.authorization.split(" ")[1];
    }
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (token) {
    try {
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      const user = await getOneNoResponse("users", { _id: decoded.id });
      if (user) {
        user.password = undefined;
        return user;
      }
    } catch (err) {
      console.log(err);
    }
  }
  return false;
};

export const verifyAdmin = async (req) => {
  let token = null;
  if (req.headers.authorization) {
    if (req.headers.authorization.split(" ")[0] === "Bearer") {
      token = req.headers.authorization.split(" ")[1];
    } else {
      token = null;
    }
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (token) {
    try {
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      const user = await getOneNoResponse("users", { _id: decoded.id });
      if (user.role === "ADMIN") {
        user.password = undefined;
        return user;
      }
    } catch (err) {
      console.log(err);
    }
  }
  return false;
};

export const logout = (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set("jwt", "loggedout", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "Successfully logged out" });
};
