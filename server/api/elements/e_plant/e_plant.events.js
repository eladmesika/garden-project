/**
 * ElementsEPlant model events
 */

'use strict';

import {EventEmitter} from 'events';
var ElementsEPlantEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ElementsEPlantEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(ElementsEPlant) {
  for(var e in events) {
    let event = events[e];
    ElementsEPlant.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ElementsEPlantEvents.emit(event + ':' + doc._id, doc);
    ElementsEPlantEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ElementsEPlantEvents;
