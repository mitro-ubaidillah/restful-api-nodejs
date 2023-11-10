import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, removeTestUser } from "../src/utils/test-utils.js";

describe('GET /api/users/current', () => { 

    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });
 
    it('should can get current user', async () => {
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        // expect(result.body.data.username).toBe('test');
        // expect(result.body.data.name).toBe('test');
    });

    
});
