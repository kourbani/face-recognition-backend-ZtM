import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '673c58cffe8748df8c86cce61c2bedee',
});

const handleApiCall = (req,res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with api')); 
}


const updateEntries = (db) => (req,res) => {
  const { id } = req.body;
  db('users')
    .where({ id: id })
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      if (entries[0].length) {
        res.json(entries);
      }
    })
    .catch((err) => res.status(400).json('unable to get entries'));
}

export {updateEntries , handleApiCall};