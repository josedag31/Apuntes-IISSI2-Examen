import { ShippingAddress } from '../models/models.js'

export const checkShippingAddressOwnership = async (req, res, next) => {
  try {
    const item = await ShippingAddress.findByPk(req.params.shippingAddressId)
    if (item.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not enough privileges.' })
    }
    next()
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
