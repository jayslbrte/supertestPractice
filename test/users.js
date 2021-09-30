import request from '../config/common';

import {expect} from 'chai';
import { interfaces, it } from 'mocha';


const TOKEN = 'fc0cb58b81a21b949bcc649a25720dcb48358e7c19114d1e4383b386ea433f72';
let userid;
describe('POST', () => {
    it ('/users', () => {
        const data = {
            email: `testemail-${Math.floor(Math.random() * 99)}@gmail.com`,
            name: "fake name",
            gender: "male",
            status: "active"
        };  
    
        return request 
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
            expect(res.body.data).to.not.be.empty;
            expect(res.body.data).to.deep.include(data);
            userid = res.body.data.id;
            console.log(userid);
        });      
    });
});



describe('GET',() => {
  it('users', () => {
    return request.get(`users?access-token= ${TOKEN}`).then((res) => {
        expect(res.body.data).to.not.be.empty;
    });
  });

  it('users/:id', () => {
    return request.get(`users/${userid}?access-token= ${TOKEN}`).then((res) => {
        expect(res.body.data).to.not.be.empty;
        //console.log(res.body.data);
    });    
  });

  it('users with params', () => {
      const url =  `users/?access-token= ${TOKEN}page=10&gender=male&status=inactive`
      return request.get(url).then((res) => {
          expect(res.body.data).to.not.be.empty;
          expect(res.body.meta.pagination.page).to.eq(1);
          res.body.data.forEach(data =>{
              expect(data.gender).to.eq('male');
              expect(data.status).to.eq('inactive');             
          })         
      });
  });
});  

describe('PUT', () => {
    it('users/:id', () => {
        const data = {
            email : `faker-${Math.floor(Math.random() * 99)}@gmail.com`,
            name : `fake name -${Math.floor(Math.random() * 99)}`,
            gender : "male"
        };
    
        return request
        .put(`users/${userid}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
            expect(res.body.data).to.deep.include(data);
            console.log(res.body.data);
        });
      });
});

describe('DELETE', () => {
    it('users/:id', () => {
        return request
        .delete(`users/${userid}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .then((res) => {
            //expect(res.body.meta).to.be.eq(null);
            console.log(res.body);
   
        });
      });
});