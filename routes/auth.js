const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Numri i rrotullimeve për hash (10 është i mirë për balancim midis sigurisë dhe shpejtësisë)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // routes/auth.js (shto këtë rrugë)
        router.post('/login', async (req, res) => {
            try {
                const { email, password } = req.body;

                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(401).json({ error: 'Email ose fjalëkalim i gabuar' });
                }

                // Krahaso fjalëkalimin e futur me hash-in e ruajtur
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ error: 'Email ose fjalëkalim i gabuar' });
                }

                res.status(200).json({ message: 'Kyçje e suksesshme', email: user.email });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Gabim gjatë kyçjes' });
            }
        });

        // Kontrollo nëse përdoruesi ekziston
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Emaili është tashmë i regjistruar' });
        }

        // Hash-o fjalëkalimin
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Krijo përdoruesin e ri me fjalëkalim të hash-uar
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Ruaj në bazën e të dhënave
        await newUser.save();
        res.status(201).json({ message: 'Përdoruesi u regjistrua me sukses', email: newUser.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë regjistrimit' });
    }
});

module.exports = router;