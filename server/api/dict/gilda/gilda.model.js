'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './gilda.events';
var Schema = mongoose.Schema;
var GildaSchema = new mongoose.Schema({
  name:{type: String,required:true,maxlength:200},
  info: String,
  active: Boolean,
  tags:[{type:Schema.Types.ObjectId,ref:'Tag'}],
  families:[{type:Schema.Types.ObjectId,ref:'Family'}]
});

registerEvents(GildaSchema);
export default mongoose.model('Gilda', GildaSchema);
