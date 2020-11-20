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

export {updateEntries};