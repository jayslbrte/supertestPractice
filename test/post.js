
require('dotenv').config();
import request from '../config/common';
const faker = require('faker');
import {expect} from 'chai';
import {createRandomUserFaker } from '../helper/user_helper';


//const TOKEN = 'fc0cb58b81a21b949bcc649a25720dcb48358e7c19114d1e4383b386ea433f72';

let postID, userId; 
const TOKEN = process.env.USER_TOKEN;
describe ('User Posts',() => {
    
    
    before(async () => {
       userId = await createRandomUserFaker();
    });

    it('posts', async () => {
        const data = {
            user_id: userId,
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
        };

    const res = await request
    .post('posts')
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(data);
    expect(res.body.data).to.deep.include(data);
    postID = res.body.data.id;    
    });

    it('GET/posts/:postID', async () => {
        const res = await request
        .get(`posts/${postID}`)
        .set('Authorization', `Bearer ${TOKEN}`);
    expect(200);
    });

describe ('Negative Tests', () => {
    it('401 Authentication Failed', async () => {
        const data = {
            user_id: userId,
            title: "supertest is awesome",
            body: "my blog posts"
       };
       const postRes = await request
            .post('posts').send(data);
            expect(postRes.body.data.message).to.eq("Authentication failed");
            expect(postRes.statusCode).to.eq(401);
    });
    it ('422 Validation Failed', async () => {
        const data = {
            user_id: userId,
            title: "supertest is awesome",
           
       };
       const postRes = await request
            .post('posts').send(data)
            .set('Authorization', `Bearer ${TOKEN}`);
            expect(postRes.body.data[0].message).to.eq("can't be blank");
            expect(postRes.statusCode).to.eq(422);    
    });

  });    
});
