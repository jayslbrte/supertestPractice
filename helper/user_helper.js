import request from '../config/common';
const faker = require('faker');
const TOKEN = 'fc0cb58b81a21b949bcc649a25720dcb48358e7c19114d1e4383b386ea433f72';

export const createRandomUserFaker = async () => {
    const data = {
        email: faker.internet.email(),
        name: faker.name.firstName() +" " + faker.name.lastName(),
        gender: "male",
        status: "active"
    };  
    const res = await request 
      .post('users')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data)
      return res.body.data.id;    
    };

export const createRandomUser = async () => {
const data = {
    email: `testemail-${Math.floor(Math.random() * 99)}@gmail.com`,
    name: "fake name",
    gender: "male",
    status: "active"
};  
const res = await request 
  .post('users')
  .set('Authorization', `Bearer ${TOKEN}`)
  .send(data)
  return res.body.data.id;    
};