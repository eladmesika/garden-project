'use strict';

var app = require('../../..');
import request from 'supertest';

var newElementsEPlant;

describe('ElementsEPlant API:', function() {
  describe('GET /api/elements/e_plants', function() {
    var elementsEPlants;

    beforeEach(function(done) {
      request(app)
        .get('/api/elements/e_plants')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          elementsEPlants = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(elementsEPlants).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/elements/e_plants', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/elements/e_plants')
        .send({
          name: 'New ElementsEPlant',
          info: 'This is the brand new elementsEPlant!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newElementsEPlant = res.body;
          done();
        });
    });

    it('should respond with the newly created elementsEPlant', function() {
      expect(newElementsEPlant.name).to.equal('New ElementsEPlant');
      expect(newElementsEPlant.info).to.equal('This is the brand new elementsEPlant!!!');
    });
  });

  describe('GET /api/elements/e_plants/:id', function() {
    var elementsEPlant;

    beforeEach(function(done) {
      request(app)
        .get(`/api/elements/e_plants/${newElementsEPlant._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          elementsEPlant = res.body;
          done();
        });
    });

    afterEach(function() {
      elementsEPlant = {};
    });

    it('should respond with the requested elementsEPlant', function() {
      expect(elementsEPlant.name).to.equal('New ElementsEPlant');
      expect(elementsEPlant.info).to.equal('This is the brand new elementsEPlant!!!');
    });
  });

  describe('PUT /api/elements/e_plants/:id', function() {
    var updatedElementsEPlant;

    beforeEach(function(done) {
      request(app)
        .put(`/api/elements/e_plants/${newElementsEPlant._id}`)
        .send({
          name: 'Updated ElementsEPlant',
          info: 'This is the updated elementsEPlant!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedElementsEPlant = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedElementsEPlant = {};
    });

    it('should respond with the updated elementsEPlant', function() {
      expect(updatedElementsEPlant.name).to.equal('Updated ElementsEPlant');
      expect(updatedElementsEPlant.info).to.equal('This is the updated elementsEPlant!!!');
    });

    it('should respond with the updated elementsEPlant on a subsequent GET', function(done) {
      request(app)
        .get(`/api/elements/e_plants/${newElementsEPlant._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let elementsEPlant = res.body;

          expect(elementsEPlant.name).to.equal('Updated ElementsEPlant');
          expect(elementsEPlant.info).to.equal('This is the updated elementsEPlant!!!');

          done();
        });
    });
  });

  describe('PATCH /api/elements/e_plants/:id', function() {
    var patchedElementsEPlant;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/elements/e_plants/${newElementsEPlant._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched ElementsEPlant' },
          { op: 'replace', path: '/info', value: 'This is the patched elementsEPlant!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedElementsEPlant = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedElementsEPlant = {};
    });

    it('should respond with the patched elementsEPlant', function() {
      expect(patchedElementsEPlant.name).to.equal('Patched ElementsEPlant');
      expect(patchedElementsEPlant.info).to.equal('This is the patched elementsEPlant!!!');
    });
  });

  describe('DELETE /api/elements/e_plants/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/elements/e_plants/${newElementsEPlant._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when elementsEPlant does not exist', function(done) {
      request(app)
        .delete(`/api/elements/e_plants/${newElementsEPlant._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
