'use strict';

import Course from './course.model.js'
import User from '../user/user.model.js'


export const test = (req, res) => {
    return res.send('Hello world');
};

export const createCourse = async(req, res)=>{
    try {
        let data = req.body
        data.user = req.user._id
        let course = new Course(data)
        await course.save()
        return res.send({message: 'Course saved successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error saving course', err})
    }
}

export const updateCourse = async(req,res)=>{
    try {
        let {id}=req.params
        let data=req.body
        let updateCourse = await Course.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('user', ['name'])
        if(!updateCourse) return res.status(404).send({message: 'Course not found, not update'})
            return res.send({message: 'Course Updated successfully', updateCourse})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating course'})
    }
}

export const deleteCourse = async(req, res)=>{
    try {
        let { id } = req.params
        let deleteCourse = await Course.findOneAndDelete({_id: id})
        if(!deleteCourse) return res.status(400).send({message:'Course not found and deleting'})
        return res.send({message: `Course by ${deleteCourse.name} delete successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'The course is not found'})
    }
}

export const getCourseByUser = async(req, res)=>{
    try{
        let { _id } = req.user
        let course = await Course.find({ user: _id }, {user: 0})
            .populate('user')
        return res.send({message: 'Your Courses: ', appointments})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting courses', err})
    }
}