import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeAllTestContact, removeTestUser } from "../src/utils/test-utils.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe('PUT /api/contacts/:contactId', () => {

    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    });

    it('should can update existing contact', async() => {
        const testContact = await getTestContact();

        const result = await supertest(web)
        .put('/api/contacts/'+ testContact.id)
        .set('Authorization', 'test')
        .send({
            firstName: 'Mitro',
            lastName: 'Ubai',
            email: 'mitro@mail.com',
            phone: '081001001001'
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.firstName).toBe('Mitro');
        expect(result.body.data.lastName).toBe('Ubai');
        expect(result.body.data.email).toBe('mitro@mail.com');
        expect(result.body.data.phone).toBe('081001001001');
    });

    it('should can reject if request invalid', async() => {
        const testContact = await getTestContact();

        const result = await supertest(web)
        .put('/api/contacts/'+ testContact.id)
        .set('Authorization', 'test')
        .send({
            firstName: '',
            lastName: 'Ubai',
            email: 'mitro@com',
            phone: '081001001001'
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
    });

    it('should can reject if request invalid', async() => {
        const testContact = await getTestContact();

        const result = await supertest(web)
        .put('/api/contacts/'+ (testContact.id + 1))
        .set('Authorization', 'test')
        .send({
            firstName: 'Mitro',
            lastName: 'Ubai',
            email: 'mitro@mail.com',
            phone: '081001001001'
        });

        logger.info(result.body);

        expect(result.status).toBe(404);
    });
    
});
