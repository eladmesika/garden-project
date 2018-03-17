'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './tag.events';

var TagSchema = new mongoose.Schema({
  name: String,
  info: {type:String,required:true,maxlength:500},
  active: Boolean
});

registerEvents(TagSchema);
export default mongoose.model('Tag', TagSchema);
