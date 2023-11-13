import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeAllTestContact, removeTestUser } from "../src/utils/test-utils.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe('POST /api/contacts', () => {

    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    });

    it('should can get a contact', async() => {
        const testContact = await getTestContact();

        const result = await supertest(web)
        .get('/api/contacts/' + testContact.id)
        .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.firstName).toBe('test');
        expect(result.body.data.lastName).toBe('test');
        expect(result.body.data.email).toBe('test@mail.com');
        expect(result.body.data.phone).toBe('08123456789');
    });
    
});
