import path from "path";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import Multer from "multer";

const router = express.Router();

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

async function handleUpload(file, customName) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    public_id: `${customName}-${Date.now()}`,
  });
  return res;
}
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI, "beer-image");
    // res.json(cldRes);
    res.status(200).send({
      message: "Image uploaded successfully",
      image: cldRes,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

export default router;
