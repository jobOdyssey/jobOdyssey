import express from 'express';
var router = express.Router();

router.get('/', (req, res) => {
    console.log("cookies ", req.cookies);
    if (req.user) {                
        console.log("user authenticated, getting user")
        res.json(req.user);
    } else {
        console.log("user NOT authenticated, 403 NOT getting user")
        res.locals.message = 'user not authenticated';
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(403).render('error');
    }
});


export default router;