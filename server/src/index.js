const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/books', require('./routes/books.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

app.get('/', (req, res) => {
    res.send('E-Book Management System API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
