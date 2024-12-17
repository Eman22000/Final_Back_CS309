import slugify from "slugify";
import fs from "fs";
import mugModel from "../models/mugModel.js";

// إضافة عنصر
export const addMug = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const mug = new mugModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })
    try {
        await mug.save();
        res.json({ success: true, massage: "Mug added" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// إنشاء عنصر
// export const createMug = async (req, res) => {
//     try {
//         const { name, description, price, category } = req.body;
//         const newItem = await mugModel.create({
//             name,
//             slug: slugify(name),
//             description,
//             price,
//             category,
//         });
//         res.status(201).json({ data: newItem });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
//all mug list 
export const mugList = async (req, res) => {
    try {
        const mugs = await mugModel.find({});
        res.json({ success: true, data: mugs })
    } catch (error) {
        console.log(error);
        res.json({ success: false, massage: "error" })
    }
}
//remove mug
export const removeMug = async (req, res) => {
    try {
        // البحث عن العنصر بناءً على المعرف (ID)
        const mug = await mugModel.findById(req.body.id);

        if (!mug) {
            // إذا لم يتم العثور على العنصر
            return res.status(404).json({
                success: false,
                message: "Mug not found!",
            });
        }

        // التحقق من وجود ملف الصورة في المجلد
        const imagePath = `uploads/${mug.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); // حذف ملف الصورة
            console.log("Image deleted successfully:", imagePath);
        } else {
            console.warn("Image file does not exist:", imagePath);
        }

        // حذف العنصر من قاعدة البيانات
        await mugModel.findByIdAndDelete(req.body.id);

        // إرسال استجابة عند النجاح
        return res.status(200).json({
            success: true,
            message: "Mug removed successfully!",
        });
    } catch (error) {
        console.error("Error while removing mug:", error);

        // إرسال استجابة عند الخطأ
        return res.status(500).json({
            success: false,
            message: "An error occurred while removing the mug.",
        });
    }
};
