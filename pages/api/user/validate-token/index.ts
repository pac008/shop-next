import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { db } from "@/database";
import { User } from "@/models";
import { jwt, validations } from "@/utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        role: string;
        name: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return checkJTW(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const checkJTW = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    token = ''
  } = req.cookies
  let userId = '';

  try {
    userId = await jwt.isValidToken(token);
    await db.connect();
    const user = await User.findById(userId).lean();

    if (!user) {
      await db.disconnect();
      return res.status(400).json({
        message: "User not exists",
      });
    }
    await db.disconnect();
    const { _id, email, role, name } = user;

    return res.status(200).json({
      token: jwt.signToken(_id, email),
      user: {
        email,
        role,
        name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token no autorizado",
    });
  }
};
