import request from 'supertest';
import app from '../../server.js';

describe('Chat Routes', () => {
    it('POST /api/chat should exist and return 200', async () => {
        const res = await request(app)
            .post('/api/chat')
            .send({ message: 'Hello' });

        expect(res.status).toBe(200);
    });

    it('GET /api/chat should return 404', async () => {
        const res = await request(app)
            .get('/api/chat');

        expect(res.status).toBe(404);
    });

    it('POST /api/unknown should return 404', async () => {
        const res = await request(app)
            .post('/api/unknown');

        expect(res.status).toBe(404);
    });
});