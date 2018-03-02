'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var elementsEPlantCtrlStub = {
  index: 'elementsEPlantCtrl.index',
  show: 'elementsEPlantCtrl.show',
  create: 'elementsEPlantCtrl.create',
  upsert: 'elementsEPlantCtrl.upsert',
  patch: 'elementsEPlantCtrl.patch',
  destroy: 'elementsEPlantCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var elementsEPlantIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './e_plant.controller': elementsEPlantCtrlStub
});

describe('ElementsEPlant API Router:', function() {
  it('should return an express router instance', function() {
    expect(elementsEPlantIndex).to.equal(routerStub);
  });

  describe('GET /api/elements/e_plants', function() {
    it('should route to elementsEPlant.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'elementsEPlantCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/elements/e_plants/:id', function() {
    it('should route to elementsEPlant.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'elementsEPlantCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/elements/e_plants', function() {
    it('should route to elementsEPlant.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'elementsEPlantCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/elements/e_plants/:id', function() {
    it('should route to elementsEPlant.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'elementsEPlantCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/elements/e_plants/:id', function() {
    it('should route to elementsEPlant.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'elementsEPlantCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/elements/e_plants/:id', function() {
    it('should route to elementsEPlant.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'elementsEPlantCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
