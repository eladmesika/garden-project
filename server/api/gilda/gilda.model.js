'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './gilda.events';

var GildaSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(GildaSchema);
export default mongoose.model('Gilda', GildaSchema);
