import  express from "express";
import { createTodo, deletetodo, gettodos, updateTodo } from "../controller/todo.controller.js";
import { authenticate } from "../middleware/authorize.js";

const router  = express.Router();

router.post("/create" ,authenticate , createTodo);
router.get("/fetch" ,authenticate , gettodos );
router.put("/update/:id" , authenticate ,updateTodo);
router.delete("/delete/:id",authenticate ,deletetodo)



export default router ;
