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
    case "POST":
      return registerUser(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { email: string; password: string; name: string };

  try {
    if (password.length < 6) {
      return res.status(400).json({
        message: "La contraseña debe tener 6 o más caracteres",
      });
    }

    if (name.length < 2) {
      return res.status(400).json({
        message: "El nombre 2 o más caracteres",
      });
    }

    if ( !validations.isValidEmail(email)) {
      return res.status(400).json({
        message: "El correo no tiene formato de correo",
      });
    }

    await db.connect();
    const user = await User.findOne({ email }).lean();

    if (user) {
      await db.disconnect();
      return res.status(400).json({
        message: "Ese correo ya está registrado",
      });
    }

    const newUser = new User({
      email: email.toLocaleLowerCase(),
      password: bcrypt.hashSync(password),
      role: 'client',
      name
    })

    await newUser.save({validateBeforeSave: true})
    await db.disconnect();
    const { _id, role } = newUser;

    const token = jwt.signToken(_id, email);

    return res.status(200).json({
      token,
      user: {
        email,
        role,
        name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }
};
