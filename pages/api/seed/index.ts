// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {db}  from "@/database";
import { Product, User} from '@/models';
import { initialData } from '@/database/seed-data';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "No tiene acceso" });
  }

  await db.connect();

  await User.deleteMany();
  await User.insertMany(initialData.users);
  await Product.deleteMany();
  await Product.insertMany(initialData.products);

  await db.disconnect();
  res.status(200).json({ message: "todo bien" });
}
