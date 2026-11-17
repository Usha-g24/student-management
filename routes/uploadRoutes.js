
const express = require("express");
const multer = require("multer");
const { randomUUID } = require("crypto");

const {
  S3Client,
  PutObjectCommand
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

    // Check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image"
      });
    }

    // Check S3 bucket configuration
    if (!process.env.S3_BUCKET || !process.env.AWS_REGION) {
      return res.status(500).json({
        success: false,
        message: "S3 configuration is missing"
      });
    }

    // Generate unique image name
    const extension = req.file.originalname.split(".").pop();
    const fileName = `${randomUUID()}.${extension}`;

    // S3 Upload Command
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    });

    // Upload to AWS S3
    await s3.send(command);

    // Success Response
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

module.exports = router;
