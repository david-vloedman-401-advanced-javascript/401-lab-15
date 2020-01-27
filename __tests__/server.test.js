'use strict';

const {server} = require('../src/app');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Product API', ()=>{
  it('can post a new product', ()=>{
    let obj = {name: 'david', amount: 1, category_id: 'people'};
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(data => {
      
        let record = data.body;
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('can get a list of products', ()=>{
    return mockRequest
      .get('/api/v1/products')
      .send()
      .then(data => {        
        expect(data.body.count).toEqual(1);
      });
  });

  it('can get a single product', ()=>{
    return mockRequest.get('/api/v1/products')
      .send('5e209bf0b9eebd1542b97480')
      .then(data => {
        
        expect(data.body.count).toEqual(1);
      });
  });

  it('can update a record', ()=>{
    const obj = {name: 'TumTum', amount: 4, category_id: 'tummies'};
    const updated = {name: 'NoTumTum', amount: 4, category_id: 'tummies'};
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then(data => {
        return mockRequest
          .put(`/api/v1/products/${data.body._id}`)
          .send(updated)
          .then(result => {            
            expect(result.body.name).toBe('NoTumTum');
          });          
      });
  });

  it('can delete a record', ()=> {
    const obj = {name: 'TumTum', amount: 6 , category_id: 'tummies'};
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then(res => {
        return mockRequest
          .delete(`/api/v1/products/${res.body._id}`)
          .send()
          .then(response => {
            let record = response.body;
            Object.keys(obj).forEach(key => {
              expect(record[key]).toEqual(obj[key]);
            });
          });
      });
  });
});



describe('Catgories API', () => {

  it('can post a new category', () => {
    const cat = {    
      category_id: 'david',  
      price: 1,
      weight: 3,
      quantity_in_stock: 3,
    };
    
    return mockRequest
      .post('/api/v1/categories')
      .send(cat)
      .then(data => {        
        let record = data.body;        
        Object.keys(cat).forEach(key => {
          expect(record[key]).toEqual(cat[key]);
        });
      });
  });


  it('can get a single category', () => {
    const obj = {
      category_id: 'wahwah',
      price: 1,
      weight: 3,
      quantity_in_stock: 3,
    };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(res => {        
        return mockRequest
          .get(`/api/v1/categories/${res.body._id}`)
          .send()
          .then(data => {     
            let record = data.body;   
            Object.keys(obj).forEach(key => {
              expect(record[key]).toEqual(obj[key]);
            });
          });
      });
  });
    
    

  it('can update a record', () => {
    const obj = { category_id: 'TumTum', price: 4, weight: 4, quantity_in_stock: 6 };
    const updated = { category_id: 'NoTumTum', price: 4, weight: 6, quantity_in_stock: 18 };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest
          .put(`/api/v1/categories/${data.body._id}`)
          .send(updated)
          .then(result => {
            let record = result.body;   
            Object.keys(obj).forEach(key => {
              expect(record[key]).toEqual(updated[key]);
            });
          });
      });
  });

  it('can delete a record', () => {
    const obj = {
      category_id: 'TumTum',
      price: 4,
      weight: 4,
      quantity_in_stock: 6,
    };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(res => {
        return mockRequest
          .delete(`/api/v1/categories/${res.body._id}`)
          .send()
          .then(response => {
            let record = response.body;
            Object.keys(obj).forEach(key => {
              expect(record[key]).toEqual(obj[key]);
            });
          });
      });
  });


  it('can get a list of categories', () => {
    return mockRequest
      .get('/api/v1/categories')
      .send()
      .then(data => {
        expect(data.body.count).toEqual(3);
      });
  });

  it('should return status 500', ()=>{
    return mockRequest
      .post('/api/v1/categories')
      .send()
      .then(res => {
        expect(res.status).toBe(500);
      });
  });
});
