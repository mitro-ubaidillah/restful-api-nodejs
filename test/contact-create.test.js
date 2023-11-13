import supertest from "supertest";
import { createTestUser, removeAllTestContact, removeTestUser } from "../src/utils/test-utils";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe('POST /api/contacts', () => {

    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    });

    it('should can create a new contact', async() => {
        const result = await supertest(web)
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
            firstName: 'test',
            lastName: 'test',
            email: 'test@mail.com',
            phone: '08123456789'
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.firstName).toBe('test');
        expect(result.body.data.lastName).toBe('test');
        expect(result.body.data.email).toBe('test@mail.com');
        expect(result.body.data.phone).toBe('08123456789');
    });

    it('should can reject if request is not valid', async() => {
        const result = await supertest(web)
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
            firstName: '',
            lastName: 'test',
            email: 'test@mail.com',
            phone: '0812345678910111213141516'
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should can reject if token is not valid', async() => {
        const result = await supertest(web)
        .post('/api/contacts')
        .set('Authorization', 'test1234')
        .send({
            firstName: 'test',
            lastName: 'test',
            email: 'test@mail.com',
            phone: '08123456789'
        });
        
        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
    
});
