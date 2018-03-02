/**
 * Gilda model events
 */

'use strict';

import {EventEmitter} from 'events';
var GildaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GildaEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Gilda) {
  for(var e in events) {
    let event = events[e];
    Gilda.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    GildaEvents.emit(event + ':' + doc._id, doc);
    GildaEvents.emit(event, doc);
  };
}

export {registerEvents};
export default GildaEvents;
