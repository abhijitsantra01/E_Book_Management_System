const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserDashboard = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: { subscription: true, uploads: true },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.subscribe = async (req, res) => {
    try {
        const { durationDays } = req.body; // e.g., 30
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + (durationDays || 30));

        const subscription = await prisma.subscription.upsert({
            where: { userId: req.user.id },
            update: { startDate, endDate, isActive: true },
            create: { userId: req.user.id, startDate, endDate, isActive: true },
        });

        res.json(subscription);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.uploadBook = async (req, res) => {
    try {
        const { title, author, description } = req.body;
        // File handling would be here, assuming req.file is populated by multer
        // For now, we'll just use placeholders or req.file.path if available
        const coverImage = req.files['cover'] ? `uploads/${req.files['cover'][0].filename}` : 'placeholder.jpg';
        const fileUrl = req.files['book'] ? `uploads/${req.files['book'][0].filename}` : 'placeholder.pdf';

        const upload = await prisma.upload.create({
            data: {
                userId: req.user.id,
                title,
                author,
                description,
                coverImage,
                fileUrl,
                status: 'PENDING',
            },
        });

        res.status(201).json(upload);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.toggleBookmark = async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user.id;

        const existing = await prisma.bookmark.findUnique({
            where: {
                userId_bookId: {
                    userId,
                    bookId,
                },
            },
        });

        if (existing) {
            await prisma.bookmark.delete({
                where: { id: existing.id },
            });
            res.json({ bookmarked: false });
        } else {
            await prisma.bookmark.create({
                data: {
                    userId,
                    bookId,
                },
            });
            res.json({ bookmarked: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getBookmarks = async (req, res) => {
    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: { userId: req.user.id },
            include: { book: true },
        });
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
