const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    const { title, description, instructor } = req.body;
    try {
        const course = new Course({ title, description, instructor, createdBy: req.user.id });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('createdBy', 'username');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, instructor } = req.body;
    try {
        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        if (course.createdBy.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
        course.title = title || course.title;
        course.description = description || course.description;
        course.instructor = instructor || course.instructor;
        await course.save();
        res.json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        if (course.createdBy.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
        await course.remove();
        res.json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};