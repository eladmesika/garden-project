'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './e_plant.events';

var ElementsEPlantSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(ElementsEPlantSchema);
export default mongoose.model('ElementsEPlant', ElementsEPlantSchema);
