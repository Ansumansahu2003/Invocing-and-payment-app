const router = require('express').Router();
import verify from "./verifyToken";


router.get('/', verify,(req,res) =>{
    /*res.json({
        posts:{
            title: 'my first post',
            description: 'random data you shouldnt acess'
        }
    })*/
})





export default router;
