const express = require('express');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req:any, res:any) => {
  const results:any = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data:any) => {
      results.push(data);
    })
    .on('end', () => {
      res.json(results); // temporary
    });
});
module.exports = router;