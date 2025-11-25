const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Create Admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: adminPassword,
            role: 'ADMIN',
        },
    });
    console.log({ admin });

    // Create Books
    const books = [
        {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
            category: 'Fiction',
            coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
            fileUrl: 'placeholder.pdf',
        },
        {
            title: 'Sapiens: A Brief History of Humankind',
            author: 'Yuval Noah Harari',
            description: 'A survey of the history of humankind from the evolution of archaic human species in the Stone Age up to the twenty-first century.',
            category: 'Non-fiction',
            coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
            fileUrl: 'placeholder.pdf',
        },
        {
            title: 'Clean Code',
            author: 'Robert C. Martin',
            description: 'A Handbook of Agile Software Craftsmanship.',
            category: 'Technology',
            coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
            fileUrl: 'placeholder.pdf',
        },
        {
            title: 'The Alchemist',
            author: 'Paulo Coelho',
            description: 'A story about following your dreams and listening to your heart.',
            category: 'Fiction',
            coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
            fileUrl: 'placeholder.pdf',
        },
        {
            title: 'Atomic Habits',
            author: 'James Clear',
            description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones.',
            category: 'Non-fiction',
            coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
            fileUrl: 'placeholder.pdf',
        },
        {
            title: 'Thinking, Fast and Slow',
            author: 'Daniel Kahneman',
            description: 'The major New York Times bestseller that explains the two systems that drive the way we think.',
            category: 'Non-fiction',
            coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
            fileUrl: 'placeholder.pdf',
        },
    ];

    for (const book of books) {
        await prisma.book.create({
            data: book,
        });
    }

    console.log('Seeded database with books');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
