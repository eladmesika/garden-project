'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var gildaCtrlStub = {
  index: 'gildaCtrl.index',
  show: 'gildaCtrl.show',
  create: 'gildaCtrl.create',
  upsert: 'gildaCtrl.upsert',
  patch: 'gildaCtrl.patch',
  destroy: 'gildaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var gildaIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './gilda.controller': gildaCtrlStub
});

describe('Gilda API Router:', function() {
  it('should return an express router instance', function() {
    expect(gildaIndex).to.equal(routerStub);
  });

  describe('GET /api/gildas', function() {
    it('should route to gilda.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'gildaCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/gildas/:id', function() {
    it('should route to gilda.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'gildaCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/gildas', function() {
    it('should route to gilda.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'gildaCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/gildas/:id', function() {
    it('should route to gilda.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'gildaCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/gildas/:id', function() {
    it('should route to gilda.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'gildaCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/gildas/:id', function() {
    it('should route to gilda.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'gildaCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
