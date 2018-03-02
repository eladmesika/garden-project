'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './plant.events';

var PlantSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  img: String
});

registerEvents(PlantSchema);
export default mongoose.model('Plant', PlantSchema);
