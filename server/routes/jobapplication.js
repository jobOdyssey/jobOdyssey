import express from 'express';
var router = express.Router();

const testObject = {    
    company: 'company from server',
    status: 'Planned',
    position: 'position from server',
    url: 'http://googgle.com',
    recentActivity: new Date(),
    notes: 'these are some notes from server',
    created: new Date()
};

router.get('/:id', (req, res) => {       
    console.log("get job application",req.param.id)
    res.json({...testObject, id: req.param.id});    
});

router.get('/', (req, res) => {                    
    const testResults = [];
    for(let i = 0; i <= 10; i++) {
        testResults.push({...testObject, id: i, company: testObject.company + ' ' + i, position: testObject.position + ' ' + i})
    }

    res.json(testResults);    
});


export default router;
