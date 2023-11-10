import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { removeTestUser } from "../src/utils/test-utils.js";

describe('POST /api/users', () => { 

    afterEach(async () => {
        await removeTestUser();
    });
 
    it('should can register new user', async () => {
        const result = await supertest(web)
        .post('/api/users')
        .send({
            username: 'test',
            password: 'test123',
            name: 'test'
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
        expect(result.body.data.password).toBeUndefined();
    });

    it('should can register empty user', async () => {
        const result = await supertest(web)
        .post('/api/users')
        .send({
            username: '',
            password: '',
            name: ''
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should can register already user', async () => {
        let result = await supertest(web)
        .post('/api/users')
        .send({
            username: 'test',
            password: 'test123',
            name: 'test'
        });

        logger.info(result.body);


        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
        .post('/api/users')
        .send({
            username: 'test',
            password: 'test123',
            name: 'test'
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
    
});
