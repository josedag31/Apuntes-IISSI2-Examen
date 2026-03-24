import { check } from 'express-validator'

const create = [
  check('stars').exists().isInt({ min: 0, max: 5 }).toInt()
]

const update = [
  check('stars').exists().isInt({ min: 0, max: 5 }).toInt()
]

export { create, update }
