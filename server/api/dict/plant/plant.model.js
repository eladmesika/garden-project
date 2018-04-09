'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './plant.events';
var Schema = mongoose.Schema;

var PlantSchema = new mongoose.Schema({
  name: {type: String, required: true, maxlength: 200},
  info: String,
  img: String,
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
});

registerEvents(PlantSchema);
export default mongoose.model('Plant', PlantSchema);


 