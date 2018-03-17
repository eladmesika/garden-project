'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var plantCtrlStub = {
  index: 'plantCtrl.index',
  show: 'plantCtrl.show',
  create: 'plantCtrl.create',
  upsert: 'plantCtrl.upsert',
  patch: 'plantCtrl.patch',
  destroy: 'plantCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var plantIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './plant.controller': plantCtrlStub
});

describe('Plant API Router:', function() {
  it('should return an express router instance', function() {
    expect(plantIndex).to.equal(routerStub);
  });

  describe('GET /api/plants', function() {
    it('should route to plant.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'plantCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/plants/:id', function() {
    it('should route to plant.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'plantCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/plants', function() {
    it('should route to plant.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'plantCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/plants/:id', function() {
    it('should route to plant.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'plantCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/plants/:id', function() {
    it('should route to plant.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'plantCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/plants/:id', function() {
    it('should route to plant.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'plantCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
