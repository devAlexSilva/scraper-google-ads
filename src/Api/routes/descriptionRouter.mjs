import { GetDescription } from '../controllers/descriptionController.mjs'
import { Router } from 'express'

const route = Router()

route.get('/description', GetDescription)

export { route as description }