import { Router } from "express";
const router = Router();
import * as libraryController from "./libraryController.js";
import { verifyToken } from "../auth/authMiddleware.js";
import { zodMiddleware } from "../../middleware/zodMiddleware.js";
import { addBookSchema, getDeleteBookSchema, updateBookSchema } from "./librarySchema.js";

router.post("/books", verifyToken, zodMiddleware(addBookSchema), libraryController.addBook);
router.get("/books", verifyToken, libraryController.listBook);
router.get("/books/:id", verifyToken, zodMiddleware(getDeleteBookSchema), libraryController.getBook);
router.put("/books/:id", verifyToken, zodMiddleware(updateBookSchema), libraryController.updateBook);
router.delete("/books/:id", verifyToken, zodMiddleware(getDeleteBookSchema), libraryController.deleteBook);

export default router;
