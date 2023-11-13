import { prismaClient } from "../application/database.js";
import bcrypt from "bcrypt";

const removeTestUser = async() => await prismaClient.user.deleteMany({
    where: {
        username: 'test'
    }
});

const createTestUser = async() => await prismaClient.user.create({
    data: {
        username: 'test',
        password: await bcrypt.hash("test123", 10),
        name: 'test',
        token: 'test'
    }
});

const getTestUser = async() => {
    await prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

const removeAllTestContact = async() => {
    await prismaClient.contact.deleteMany({
        where: {
            username: 'test'
        }
    });
}

const createTestContact = async() => await prismaClient.contact.create({
    data: {
        username: 'test',
        firstName: 'test',
        lastName: 'test',
        email: 'test@mail.com',
        phone: '08123456789'
    }
});

const getTestContact = async() => {
    return prismaClient.contact.findFirst({
        where: {
            username: 'test'
        }
    });
}

const createManyTestContact = async() => {
    for(let i = 0; i<15; i++) {
        await prismaClient.contact.create({
            data: {
                username: 'test',
                firstName: `test ${i}`,
                lastName: `test ${i}`,
                email: `test${i}@mail.com`,
                phone: `08100234587${i}`,
            }
        });
    }
}

export {
    removeTestUser,
    createTestUser,
    getTestUser,
    removeAllTestContact,
    createTestContact,
    getTestContact,
    createManyTestContact
}