import merge from 'lodash/merge';
import { Schemas } from '../store/schema';

const initialState = {
    user: Schemas.USER,
    feed: Schemas.FEED,
    reel: Schemas.REEL,
    story: Schemas.STORY,
    slot: Schemas.SLOT,
    profile: Schemas.PROFILE
};

const entities = (state = initialState, action) => {
    if (action.entities) {
        return merge({}, state, action.entities);
    }
    return state;
}

export default entities;