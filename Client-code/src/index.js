import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import reduxThunk from "redux-thunk";

import Header from "./components/header";
import Footer from "./components/footer";
import NoMatch from "./components/nomatch";
import Welcome from "./components/welcome";
import PostList from "./components/blog/post_list";
import PostNew from "./components/blog/post_new";
import PostDetail from "./components/blog/post_detail/index";

import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <div className="container" id="content">
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/posts" component={PostList} />
            <Route path="/posts/new" component={PostNew} />
            <Route path="/posts/:id" component={PostDetail} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
