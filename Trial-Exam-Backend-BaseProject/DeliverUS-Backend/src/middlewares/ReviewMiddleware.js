import { Review, Order } from '../models/models.js'

const userHasPlacedOrderInRestaurant = async (req, res, next) => {
  try {
    const numberOfOrders = await Order.count({
      where: {
        userId: req.user.id, // Order usa userId
        restaurantId: req.params.restaurantId
      }
    })
    if (numberOfOrders > 0) return next()
    return res.status(409).send('User dont have orders.')
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const checkCustomerHasNotReviewed = async (req, res, next) => {
  try {
    const numberOfReviews = await Review.count({
      where: {
        customerId: req.user.id, // <-- AQUÍ
        restaurantId: req.params.restaurantId
      }
    })
    if (numberOfReviews === 0) return next()
    return res.status(409).send('User already have a review.')
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const checkReviewOwnership = async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId)
  if (review.customerId !== req.user.id) { // <-- AQUÍ
    return res.status(403).json({ message: 'You do not have permission to modify this review.' })
  }
  next()
}

const checkReviewBelongsToRestaurant = async (req, res, next) => {
  const { restaurantId, reviewId } = req.params
  try {
    const review = await Review.findByPk(reviewId)
    // eslint-disable-next-line eqeqeq
    if (review.restaurantId != restaurantId) {
      return res.status(409).json({ error: 'Review does not belong to the specified restaurant.' })
    }
    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export { checkCustomerHasNotReviewed, userHasPlacedOrderInRestaurant, checkReviewOwnership, checkReviewBelongsToRestaurant }
