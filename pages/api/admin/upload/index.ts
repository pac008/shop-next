import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { readFileSync, unlinkSync, writeFileSync } from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return uploadFile(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const saveFile = async (file: formidable.File) => {
  // const data = readFileSync(file.filepath);
  // writeFileSync(`./public/${file.originalFilename}`, data);
  // unlinkSync(file.filepath);
  // return;
  const {secure_url} = await cloudinary.uploader.upload(file.filepath);
  return secure_url;
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      const filePath = await saveFile(files.file as formidable.File);
      resolve(filePath);
    });
  });
};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const imageUrl = await parseFiles(req);
    return res.status(200).json({ message: imageUrl });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in server" });
  }
};
