const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        // Delete from Book table
        const deletedBooks = await prisma.book.deleteMany({
            where: {
                title: 'DEVDAS',
            },
        });
        console.log(`Deleted ${deletedBooks.count} books with title "DEVDAS"`);

        // Delete from Upload table (if any remain)
        const deletedUploads = await prisma.upload.deleteMany({
            where: {
                title: 'DEVDAS',
            },
        });
        console.log(`Deleted ${deletedUploads.count} uploads with title "DEVDAS"`);

    } catch (error) {
        console.error('Error deleting book:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
