import { combineReducers } from 'redux';

import entities from './entities';
import authReducer from './auth-reducer';
import feedReducer from './feed-reducers';
import storyReducer from './story-reducer';
import slotReducer from './slot-reducer';
import reelReducer from './reel-reducer';

const rootReducer = combineReducers({
  entities,
  authReducer,
  feedReducer,
  storyReducer,
  slotReducer,
  reelReducer
});

export default rootReducer;
