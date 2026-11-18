
const express = require("express");
const multer = require("multer");
const { randomUUID } = require("crypto");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command
} = require("@aws-sdk/client-s3");

const router = express.Router();

// AWS S3 Configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION
});

// Multer Configuration
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB limit
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});

// POST API - Upload Image to S3
router.post("/upload", upload.single("image"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image"
      });
    }

    if (!process.env.S3_BUCKET || !process.env.AWS_REGION) {
      return res.status(500).json({
        success: false,
        message: "S3 configuration is missing"
      });
    }

    const extension = req.file.originalname.split(".").pop();
    const fileName = `${randomUUID()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    });

    await s3.send(command);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      key: fileName
    });

  } catch (error) {

    console.error("S3 Upload Error:", error);

    res.status(500).json({
      success: false,
      message: "Image upload failed"
    });
  }
});


// GET API - Download Image from S3
router.get("/download/:key", async (req, res) => {
  try {

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: req.params.key
    });

    const result = await s3.send(command);

    res.setHeader(
      "Content-Type",
      result.ContentType || "application/octet-stream"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${req.params.key}"`
    );

    result.Body.pipe(res);

  } catch (error) {

    console.error("S3 Download Error:", error);

    res.status(500).json({
      success: false,
      message: "Image download failed"
    });
  }
});


// DELETE API - Delete Image from S3
router.delete("/delete/:key", async (req, res) => {
  try {

    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: req.params.key
    });

    await s3.send(command);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      key: req.params.key
    });

  } catch (error) {

    console.error("S3 Delete Error:", error);

    res.status(500).json({
      success: false,
      message: "Image delete failed"
    });
  }
});


// GET API - List Images from S3
router.get("/list", async (req, res) => {
  try {

    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET
    });

    const result = await s3.send(command);

    const files = (result.Contents || []).map(file => ({
      key: file.Key,
      size: file.Size,
      lastModified: file.LastModified
    }));

    res.status(200).json({
      success: true,
      count: files.length,
      files: files
    });

  } catch (error) {

    console.error("S3 List Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to list S3 files"
    });
  }
});

module.exports = router;
