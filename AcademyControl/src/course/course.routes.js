'use strict'

import express from 'express'
import { validateJwt, isTeacher} from '../middlewares/validate.jwt.js'
import { createCourse, deleteCourse, test, updateCourse } from './course.controller.js'

const api = express.Router()

api.get('/test', [validateJwt, isTeacher], test)
api.post('/create', [validateJwt, isTeacher], createCourse)
api.put('/update/:id', [validateJwt, isTeacher], updateCourse)
api.delete('/delete/:id',[validateJwt, isTeacher], deleteCourse)

export default api