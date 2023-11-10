import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, getTestUser, removeTestUser } from "../src/utils/test-utils.js";

describe('DELETE /api/users/logout', () => { 

    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });
 
    it('should can logout', async () => {
        const result = await supertest(web)
        .delete('/api/users/logout')
        .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data).toBe('Logout success');
        

        const user = await getTestUser();
        expect(user.token).toBeNull();
    });

    it('should reject logout if token is invalid', async () => {
        const result = await supertest(web)
        .delete('/api/users/logout')
        .set('Authorization', 'test1');

        logger.info(result.body);

        expect(result.status).toBe(401);
    });
});
