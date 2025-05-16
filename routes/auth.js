const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email dhe password janë të detyrueshme' });
        }

        // Kontrollo nëse kredencialet janë të sakta (shtuar për testim)
        if (email !== 'enovaku@uet.edu.al' || password !== 'DurresiTirana5') {
            return res.status(401).json({ error: 'Email ose password i pasaktë' });
        }

        res.json({ message: 'Login i suksesshëm', email, password });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Problem me serverin' });
    }
});

module.exports = router;