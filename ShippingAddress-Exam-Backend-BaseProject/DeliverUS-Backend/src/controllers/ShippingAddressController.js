import { ShippingAddress } from '../models/models.js'
import { } from 'sequelize'

const ShippingAddressController = {
  async index (req, res) {
    try {
      const items = await ShippingAddress.findAll({
        where: { userId: req.user.id }
      })
      res.json(items)
    } catch (err) { res.status(500).send(err) }
  },

  async create (req, res) {
    try {
      const newItem = ShippingAddress.build(req.body)
      newItem.userId = req.user.id
      const count = await ShippingAddress.count({ where: { userId: req.user.id } })
      if (count === 0) {
        newItem.isDefault = true
      }
      const savedItem = await newItem.save()
      res.status(201).json(savedItem)
    } catch (err) { res.status(500).send(err) }
  },

  async update (req, res) {
    // TODO
    res.status(500).send('Not implemented')
  },

  async destroy (req, res) {
    try {
      const result = await ShippingAddress.destroy({ where: { id: req.params.shippingAddressId } })
      const message = result === 1 ? 'Successfully deleted.' : 'Could not delete.'
      res.json(message)
    } catch (err) { res.status(500).send(err) }
  },

  async markDefault (req, res) {
    try {
      await ShippingAddress.update(
        { isDefault: false },
        { where: { userId: req.user.id } }
      )
      await ShippingAddress.update(
        { isDefault: true },
        { where: { id: req.params.shippingAddressId } }
      )
      const updatedAddress = await ShippingAddress.findByPk(req.params.shippingAddressId)
      res.json(updatedAddress)
    } catch (err) { res.status(500).send(err) }
  }
}

export default ShippingAddressController
