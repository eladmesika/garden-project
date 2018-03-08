'use strict';
import Plant from '../plant/plant.model'

import mongoose from 'mongoose';
import {registerEvents} from './family.events';
var ObjectId=require('mongodb').ObjectId;

var FamilySchema = new mongoose.Schema({
 
  name: String,
  info: String,
  active: Boolean,
  img:String,
  Plants:[{type:mongoose.Schema.Types.ObjectId,ref:Plant}]
});


FamilySchema.pre('save',function(next){
  next();
});

registerEvents(FamilySchema);
export default mongoose.model('Family', FamilySchema);
