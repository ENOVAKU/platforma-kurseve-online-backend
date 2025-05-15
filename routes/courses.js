const express = require('express');
const router = express.Router();
const { createCourse, getCourses, updateCourse, deleteCourse } = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.post('/', createCourse);
router.get('/', getCourses);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;