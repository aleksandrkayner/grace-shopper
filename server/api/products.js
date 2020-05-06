const router = require('express').Router()
const Product = require('../db/models/product')
const Category = require('../db/models/category')
module.exports = router

router.get('/', async (req, res, next) => {
  //console.log('<><><><><><><><><>><><><><><><><>')
  try {
    const products = await Product.findAll()
    // console.log('from server side get products', products)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  console.log('<><><><><><><><><>><><><><><><><>', req.params.id)
  try {
    const product = await Product.findByPk(req.params.id, {include: Category})
    console.log('from server side get products', product)
    res.json(product)
  } catch (err) {
    next(err)
  }
})
// router.get('/:page?', (req, res, next) => {
//   const resultsPerPage = 8
//   // pageNum is zero indexed
//   let pageNum = req.params.page
//   //console.log("12121212121212121212121", pageNum);
//   if (pageNum === undefined) {
//     pageNum = 0
//   } else if (isNaN(pageNum)) {
//     return res.status(400).send({error: 'Invalid page number'})
//   }

//   const {limit, offset} = paginate(pageNum, resultsPerPage)
//   Employee.findAndCountAll({
//     limit,
//     offset,
//     // order: [
//     //   ["firstName", "asc"],
//     //   ["lastName", "asc"]
//     // ]
//   }).then((results) => {
//     res.status(200).send(results)
//   })
// })