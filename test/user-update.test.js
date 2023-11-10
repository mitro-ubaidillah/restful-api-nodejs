import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, getTestUser, removeTestUser } from "../src/utils/test-utils.js";
import bcrypt from "bcrypt";

describe('PATCH /api/users/current', () => { 

    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });
 
    it('should can update user (username, password)', async () => {
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
            name: "mitro",
            password: "mitro123"
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('mitro');

        const user = await getTestUser();
        expect(await bcrypt.compare("mitro123", user.password)).toBe(true);
    });


    it('should can update username', async () => {
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
            name: "mitro",
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('mitro');

        // const user = await getTestUser();
        // expect(await bcrypt.compare("mitro123", user.password)).toBe(true);
    });


    it('should can update password', async () => {
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
            password: "mitro123",
        });

        logger.info(result.body);

        expect(result.status).toBe(200);

        const user = await getTestUser();
        expect(await bcrypt.compare("mitro123", user.password)).toBe(true);
    });

    it('should can reject update because token is wrong', async () => {
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization', 'wrong')
        .send({
            password: "mitro123",
        });

        logger.info(result.body);

        expect(result.status).toBe(401);
    });
    
});
