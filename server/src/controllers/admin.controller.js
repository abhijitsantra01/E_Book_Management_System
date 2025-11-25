const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getStats = async (req, res) => {
    try {
        const totalUsers = await prisma.user.count();
        const totalBooks = await prisma.book.count();
        const totalUploads = await prisma.upload.count();
        const activeSubscriptions = await prisma.subscription.count({ where: { isActive: true } });

        res.json({
            totalUsers,
            totalBooks,
            totalUploads,
            activeSubscriptions,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: { subscription: true, uploads: true },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.approveUpload = async (req, res) => {
    try {
        const { id } = req.params;
        const upload = await prisma.upload.findUnique({ where: { id } });

        if (!upload) {
            return res.status(404).json({ message: 'Upload not found' });
        }

        // Move to Book
        const book = await prisma.book.create({
            data: {
                title: upload.title,
                author: upload.author,
                description: upload.description,
                coverImage: upload.coverImage,
                fileUrl: upload.fileUrl,
                category: 'Community', // Default or from upload if added
            },
        });

        // Update upload status
        await prisma.upload.update({
            where: { id },
            data: { status: 'APPROVED' },
        });

        res.json({ message: 'Book approved', book });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.rejectUpload = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.upload.update({
            where: { id },
            data: { status: 'REJECTED' },
        });
        res.json({ message: 'Upload rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
