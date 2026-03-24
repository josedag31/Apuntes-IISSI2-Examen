import { Review } from '../models/models.js'

const ReviewController = {

  async index (req, res) {
    try {
      const elementos = await Review.findAll({
        where: { restaurantId: req.params.restaurantId }
      })
      res.json(elementos)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async create (req, res) {
    try {
      const nuevoElemento = Review.build(req.body)
      if (req.params.restaurantId) {
        nuevoElemento.restaurantId = req.params.restaurantId
      }
      nuevoElemento.customerId = req.user.id // <-- AQUÍ

      const elementoGuardado = await nuevoElemento.save()
      res.json(elementoGuardado)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async update (req, res) {
    try {
      await Review.update(req.body, { where: { id: req.params.reviewId } })
      const elementoActualizado = await Review.findByPk(req.params.reviewId)
      res.json(elementoActualizado)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async destroy (req, res) {
    try {
      const result = await Review.destroy({ where: { id: req.params.reviewId } })
      let message = ''
      if (result === 1) {
        message = 'Successfully deleted.'
      } else {
        message = 'Could not delete.'
      }
      res.json(message)
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

export default ReviewController
