const express = require('express');
const router = express.Router();
const { createCourse, getCourses, updateCourse, deleteCourse } = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/add', (req, res) => {
    try {
        const { title, description, price } = req.body;

        if (!title || !description || !price) {
            return res.status(400).json({ error: 'Title, description dhe price janë të detyrueshme' });
        }

        res.json({ message: 'Kursi u shtua me sukses', title, description, price });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Problem me serverin' });
    }
});

// PUT - Përditëson një kurs ekzistues
router.put('/update/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price } = req.body;

        if (!title || !description || !price) {
            return res.status(400).json({ error: 'Title, description dhe price janë të detyrueshme' });
        }

        res.json({ message: 'Kursi me ID ${id} u përditësua me sukses, title, description, price' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Problem me serverin' });
    }
});

// DELETE - Fshin një kurs ekzistues
router.delete('/delete/:id', (req, res) => {
    try {
        const { id } = req.params;

        res.json({ message: 'Kursi me ID ${ id } u fshi me sukses' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Problem me serverin' });
    }
});

router.use(authMiddleware);
router.post('/', createCourse);
router.get('/', getCourses);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
