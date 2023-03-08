const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories and include its associated Products in a json format
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try { let categoryData = await Category.findAll({

    include: [{model: Product}],
  });

  res.status(200).json(categoryData);
  } catch (err) {

    res.status(500).json(err);
  }
});

//finds one category with a specific id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try { let categoryData = await Category.findByPk(req.params.id, {

    include: [{model: Product}],
  });

  res.status(200).json(categoryData);
  } catch (err) {

    res.status(500).json(err);
  }
});
  
//creates a new category based on input data
router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then((categoryData) => {

    res.status(200).json(categoryData);
  }).catch((err) => {

    res.status(400).json(err);
  });
});

//updates a category based on input data
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id
      },
    }
  ).then((updated) => {

    res.status(200).json(updated);
  }).catch((err) => res.status(400).json(err))
});

//deletes a category based on the id
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then((deleted) => {

    res.status(200).json(deleted);
  }).catch((err) => res.status(400).json(err))
});

module.exports = router;
