'use strict';

var app = require('../..');
import request from 'supertest';

var newGilda;

describe('Gilda API:', function() {
  describe('GET /api/gildas', function() {
    var gildas;

    beforeEach(function(done) {
      request(app)
        .get('/api/gildas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          gildas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(gildas).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/gildas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/gildas')
        .send({
          name: 'New Gilda',
          info: 'This is the brand new gilda!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newGilda = res.body;
          done();
        });
    });

    it('should respond with the newly created gilda', function() {
      expect(newGilda.name).to.equal('New Gilda');
      expect(newGilda.info).to.equal('This is the brand new gilda!!!');
    });
  });

  describe('GET /api/gildas/:id', function() {
    var gilda;

    beforeEach(function(done) {
      request(app)
        .get(`/api/gildas/${newGilda._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          gilda = res.body;
          done();
        });
    });

    afterEach(function() {
      gilda = {};
    });

    it('should respond with the requested gilda', function() {
      expect(gilda.name).to.equal('New Gilda');
      expect(gilda.info).to.equal('This is the brand new gilda!!!');
    });
  });

  describe('PUT /api/gildas/:id', function() {
    var updatedGilda;

    beforeEach(function(done) {
      request(app)
        .put(`/api/gildas/${newGilda._id}`)
        .send({
          name: 'Updated Gilda',
          info: 'This is the updated gilda!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedGilda = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGilda = {};
    });

    it('should respond with the updated gilda', function() {
      expect(updatedGilda.name).to.equal('Updated Gilda');
      expect(updatedGilda.info).to.equal('This is the updated gilda!!!');
    });

    it('should respond with the updated gilda on a subsequent GET', function(done) {
      request(app)
        .get(`/api/gildas/${newGilda._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let gilda = res.body;

          expect(gilda.name).to.equal('Updated Gilda');
          expect(gilda.info).to.equal('This is the updated gilda!!!');

          done();
        });
    });
  });

  describe('PATCH /api/gildas/:id', function() {
    var patchedGilda;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/gildas/${newGilda._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Gilda' },
          { op: 'replace', path: '/info', value: 'This is the patched gilda!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedGilda = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedGilda = {};
    });

    it('should respond with the patched gilda', function() {
      expect(patchedGilda.name).to.equal('Patched Gilda');
      expect(patchedGilda.info).to.equal('This is the patched gilda!!!');
    });
  });

  describe('DELETE /api/gildas/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/gildas/${newGilda._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when gilda does not exist', function(done) {
      request(app)
        .delete(`/api/gildas/${newGilda._id}`)
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
