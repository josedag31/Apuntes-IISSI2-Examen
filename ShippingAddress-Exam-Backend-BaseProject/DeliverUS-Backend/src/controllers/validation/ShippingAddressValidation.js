import { check } from 'express-validator'

const create = [
  check('alias').exists().isString(),
  check('street').exists().isString(),
  check('city').exists().isString(),
  check('zipCode').exists().isString(),
  check('province').exists().isString(),
  check('isDefault').optional().isBoolean()
]

const update = [
  check('alias').exists().isString(),
  check('street').exists().isString(),
  check('city').exists().isString(),
  check('zipCode').exists().isString(),
  check('province').exists().isString(),
  check('isDefault').optional().isBoolean()
]

export { create, update }
