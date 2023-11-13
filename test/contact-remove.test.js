import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeAllTestContact, removeTestUser } from "../src/utils/test-utils.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe('DELETE /api/contacts/:contactId', () => {

    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    });

    it('should can delete contact', async() => {
        let testContact = await getTestContact();

        const result = await supertest(web)
        .delete('/api/contacts/'+ testContact.id)
        .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data).toBe('Contact deleted');

        testContact = await getTestContact();
        expect(testContact).toBeNull();
    });

    it('should can reject if request invalid', async() => {
        const testContact = await getTestContact();

        const result = await supertest(web)
        .delete('/api/contacts/'+ (testContact.id + 1))
        .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(404);
    });
    
});
