'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var TagCtrlStub = {
  index: 'TagCtrl.index',
  show: 'TagCtrl.show',
  create: 'TagCtrl.create',
  upsert: 'TagCtrl.upsert',
  patch: 'TagCtrl.patch',
  destroy: 'TagCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var TagIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './tag.controller': TagCtrlStub
});

describe('Tag API Router:', function() {
  it('should return an express router instance', function() {
    expect(TagIndex).to.equal(routerStub);
  });

  describe('GET /api/dict/tags', function() {
    it('should route to Tag.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'TagCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/dict/tags/:id', function() {
    it('should route to Tag.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'TagCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/dict/tags', function() {
    it('should route to Tag.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'TagCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/dict/tags/:id', function() {
    it('should route to Tag.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'TagCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/dict/tags/:id', function() {
    it('should route to Tag.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'TagCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/dict/tags/:id', function() {
    it('should route to Tag.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'TagCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
