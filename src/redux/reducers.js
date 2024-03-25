import { STOREBLOGS } from './actions';

const initialState = {
  blogs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STOREBLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
