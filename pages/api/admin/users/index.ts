import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { User } from "@/models";
import { IUser } from "@/interfaces";
import { isValidObjectId } from "mongoose";

type Data =
  | {
      message: string;
    }
  | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);

    case "PUT":
      return updateUser(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
      break;
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const users = await User.find().select("-password").lean();
    await db.disconnect();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error server" });
  }
};
const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = "", role = "" } = req.body;
  try {
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "No existe user por ese id" });
    }
    const rolesValid = ['admin', 'client'];
    if (!rolesValid.includes(role)) {
      return res.status(400).json({ message: "Rol no permitido" });
    }

    await db.connect();
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = role;
    await user.save();
    await db.disconnect();
    return res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error server" });
  }
};
