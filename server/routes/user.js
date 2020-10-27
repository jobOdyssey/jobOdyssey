import express from 'express';
var router = express.Router();

router.get('/', (req, res) => {
    if (req.user) {                
        res.json(req.user);
    }
});


export default router;