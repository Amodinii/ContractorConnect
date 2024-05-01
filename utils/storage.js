import multer, { diskStorage } from "multer";

// Multer storage configuration
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Tenders"); // Destination directory for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Use original filename
  },
});

// Create multer middleware instance
const upload = multer({ storage: storage });

export default upload;
