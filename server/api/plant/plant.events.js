/**
 * Plant model events
 */

'use strict';

import {EventEmitter} from 'events';
var PlantEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PlantEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Plant) {
  for(var e in events) {
    let event = events[e];
    Plant.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    PlantEvents.emit(event + ':' + doc._id, doc);
    PlantEvents.emit(event, doc);
  };
}

export {registerEvents};
export default PlantEvents;
