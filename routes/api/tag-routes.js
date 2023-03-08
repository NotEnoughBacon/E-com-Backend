const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//gets all tags
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try { let tagData = await Tag.findAll({

    include: [{model: Product}],
  });

  res.status(200).json(tagData);
  } catch (err) {

    res.status(500).json(err);
  }
});

//gets one tag with the id
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try { let tagData = await Tag.findByPk(req.params.id, {

    include: [{model: Product}],
  });

  res.status(200).json(tagData);
  } catch (err) {

    res.status(500).json(err);
  }
});

//creates a new tag based on input data
router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then((tagData) => {

    res.status(200).json(tagData);
  }).catch((err) => {

    res.status(400).json(err);
  })
});

//updates a tag based on input data
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then((updated) => {

    res.status(200).json(updated);
  }).catch((err) => 

    res.status(400).json(err));
});

//deletes a tag based on its id
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  ).then((deleted) => {

    res.status(200).json(deleted);
  }).catch((err) => res.status(400).json(err))
});

module.exports = router;
