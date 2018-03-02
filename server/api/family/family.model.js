'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './family.events';

var FamilySchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(FamilySchema);
export default mongoose.model('Family', FamilySchema);
