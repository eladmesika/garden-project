'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './family.events';
var Schema = mongoose.Schema;

var FamilySchema = new mongoose.Schema({
  name: {type: String, required: true, maxlength: 200},
  info: String,
  img: String,
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  plants: [{type: Schema.Types.ObjectId, ref: 'Plant'}]
});

registerEvents(FamilySchema);
export default mongoose.model('Family', FamilySchema);
