import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import postsReducer from "./posts_reducer";

const rootReducer = combineReducers({
  form: formReducer, // the form property of state is going to be produced by ReduxForm reducer
  posts: postsReducer,
});

export default rootReducer;
