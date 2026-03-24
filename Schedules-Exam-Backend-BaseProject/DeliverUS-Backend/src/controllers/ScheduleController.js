import { Schedule } from '../models/models.js'

const indexRestaurant = async function (req, res) {
  try {
    const items = await Schedule.findAll({ where: { restaurantId: req.params.restaurantId }})
    res.json(items)
  } catch (err) { 
    res.status(500).send(err) 
  }

}

const create = async function (req, res) {
  try {
    const newItem = Schedule.build(req.body)
    if (req.params.restaurantId) newItem.restaurantId = req.params.restaurantId
    const savedItem = await newItem.save()
    res.json(savedItem)
  } catch (err) { 
    res.status(500).send(err) 
  }
}

const update = async function (req, res) {
  try {
    await Schedule.update(req.body, { 
      where: { 
      id: req.params.scheduleId} 
    })
    const updatedItem = await Schedule.findByPk(req.params.scheduleId)
    res.json(updatedItem)
  } catch (err) { 
    res.status(500).send(err) 
  }
}

const destroy = async function (req, res) {
  try {
    const result = await Schedule.destroy({ where: { id: req.params.scheduleId } })
    let message = result === 1 ? 'Successfully deleted.' : 'Could not delete.'
    res.json(message)
  } catch (err) { 
    res.status(500).send(err) 
  }
}

const ScheduleController = {
  indexRestaurant,
  create,
  update,
  destroy
}

export default ScheduleController
