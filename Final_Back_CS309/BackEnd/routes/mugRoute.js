import express from "express";
import { addMug , mugList , removeMug} from "../controllers/mugController.js";
import multer from "multer";

const mugRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads", // Ensure the folder exists
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

//Routs
mugRouter.post("/add", upload.single("image"), addMug);
mugRouter.get("/list", mugList);
mugRouter.post("/remove", removeMug);
export default mugRouter;
