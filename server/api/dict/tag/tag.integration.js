'use strict';

var app = require('../../..');
import request from 'supertest';

var newTag;

describe('Tag API:', function() {
  describe('GET /api/dict/tags', function() {
    var Tags;

    beforeEach(function(done) {
      request(app)
        .get('/api/dict/tags')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          Tags = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(Tags).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/dict/tags', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/dict/tags')
        .send({
          name: 'New Tag',
          info: 'This is the brand new Tag!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTag = res.body;
          done();
        });
    });

    it('should respond with the newly created Tag', function() {
      expect(newTag.name).to.equal('New Tag');
      expect(newTag.info).to.equal('This is the brand new Tag!!!');
    });
  });

  describe('GET /api/dict/tags/:id', function() {
    var Tag;

    beforeEach(function(done) {
      request(app)
        .get(`/api/dict/tags/${newTag._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          Tag = res.body;
          done();
        });
    });

    afterEach(function() {
      Tag = {};
    });

    it('should respond with the requested Tag', function() {
      expect(Tag.name).to.equal('New Tag');
      expect(Tag.info).to.equal('This is the brand new Tag!!!');
    });
  });

  describe('PUT /api/dict/tags/:id', function() {
    var updatedTag;

    beforeEach(function(done) {
      request(app)
        .put(`/api/dict/tags/${newTag._id}`)
        .send({
          name: 'Updated Tag',
          info: 'This is the updated Tag!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTag = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTag = {};
    });

    it('should respond with the updated Tag', function() {
      expect(updatedTag.name).to.equal('Updated Tag');
      expect(updatedTag.info).to.equal('This is the updated Tag!!!');
    });

    it('should respond with the updated Tag on a subsequent GET', function(done) {
      request(app)
        .get(`/api/dict/tags/${newTag._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let Tag = res.body;

          expect(Tag.name).to.equal('Updated Tag');
          expect(Tag.info).to.equal('This is the updated Tag!!!');

          done();
        });
    });
  });

  describe('PATCH /api/dict/tags/:id', function() {
    var patchedTag;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/dict/tags/${newTag._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Tag' },
          { op: 'replace', path: '/info', value: 'This is the patched Tag!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTag = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTag = {};
    });

    it('should respond with the patched Tag', function() {
      expect(patchedTag.name).to.equal('Patched Tag');
      expect(patchedTag.info).to.equal('This is the patched Tag!!!');
    });
  });

  describe('DELETE /api/dict/tags/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/dict/tags/${newTag._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Tag does not exist', function(done) {
      request(app)
        .delete(`/api/dict/tags/${newTag._id}`)
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
