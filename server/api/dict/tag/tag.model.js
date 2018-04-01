'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './tag.events';

var TagSchema = new mongoose.Schema({
  name: {type: String, required: true, maxlength: 500},
});

registerEvents(TagSchema);
export default mongoose.model('Tag', TagSchema);
