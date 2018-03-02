/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/elements/e_plants              ->  index
 * POST    /api/elements/e_plants              ->  create
 * GET     /api/elements/e_plants/:id          ->  show
 * PUT     /api/elements/e_plants/:id          ->  upsert
 * PATCH   /api/elements/e_plants/:id          ->  patch
 * DELETE  /api/elements/e_plants/:id          ->  destroy
 */

'use strict';

import { applyPatch } from 'fast-json-patch';
import ElementsEPlant from './e_plant.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      applyPatch(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => res.status(204).end());
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of ElementsEPlants
export function index(req, res) {
  return ElementsEPlant.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ElementsEPlant from the DB
export function show(req, res) {
  return ElementsEPlant.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ElementsEPlant in the DB
export function create(req, res) {
  return ElementsEPlant.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given ElementsEPlant in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return ElementsEPlant.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing ElementsEPlant in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return ElementsEPlant.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ElementsEPlant from the DB
export function destroy(req, res) {
  return ElementsEPlant.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
