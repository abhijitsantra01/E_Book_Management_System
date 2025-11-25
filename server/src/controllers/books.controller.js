const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllBooks = async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getBookById = async (req, res) => {
    // TODO: Check subscription
    try {
        const book = await prisma.book.findUnique({ where: { id: req.params.id } });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createBook = async (req, res) => {
    // Admin only
    try {
        const { title, author, description, category } = req.body;
        // Handle file uploads (cover, pdf) here
        const book = await prisma.book.create({
            data: {
                title,
                author,
                description,
                category,
                coverImage: 'placeholder.jpg',
                fileUrl: 'placeholder.pdf',
            },
        });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
