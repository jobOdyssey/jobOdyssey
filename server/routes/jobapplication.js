import express from 'express';
var router = express.Router();

const testObject = {    
    company: 'company',
    status: 'Planned',
    position: 'position',
    url: 'http://googgle.com',
    recentActivity: new Date(),
    notes: 'this are some notes',
};

router.get('/:id', (req, res) => {                    
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
