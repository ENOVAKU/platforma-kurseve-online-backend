const jwt = require('jsonwebtoken');
const User = require('../models/Users');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Të dhëna të paplota' });
        }

        // Kontrolloni nëse përdoruesi ekziston (shembull)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Email ose fjalëkalim i pasaktë' });
        }

        // Verifikimi i fjalëkalimit
        const isMatch = (password === user.password); // Shembull i thjeshtë, zëvendësojeni me hash verifikim
        if (!isMatch) {
            return res.status(401).json({ error: 'Email ose fjalëkalim i pasaktë' });
        }

        // Login i suksesshëm
        res.status(200).json({ message: 'Login i suksesshëm', user: user.email });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Problem me serverin' });
    }
};