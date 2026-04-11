const express = require('express');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const Trip = require('../models/trip');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req:any, res:any) => {
  const results:any = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data:any) => results.push(data))
    .on('end', async () => {

      const trip = new Trip({
        userId: "user1",
        data: results
      });

      await trip.save();

      res.json({ message: "Saved to DB", trip });
    });
});
module.exports = router;