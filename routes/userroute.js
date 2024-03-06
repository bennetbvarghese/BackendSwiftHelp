import express from 'express';
import { updateuser ,getalluser,deleteuser,getuser} from '../controller/user.js';
const router = express.Router();

router.put("/:id",updateuser)
router.delete("/:id",deleteuser)
router.get("/:id",getuser)
router.get("/",getalluser)

export default router;