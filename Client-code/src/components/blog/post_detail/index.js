import React, { Component } from "react";
import { connect } from "react-redux";

import NoMatch from "../../nomatch";
import PostBody from "./post_body";

import { fetchPost } from "../../../actions";

class PostDetail extends Component {
  componentDidMount() {
    // Get post id
    const { id } = this.props.match.params;

    // Fetch post detail
    if (!this.props.post) {
      this.props.fetchPost(id);
    }
  }

  render() {
    // If there is no post match the given post ID, render NoMatch page
    if (!this.props.post) {
      return <NoMatch />;
    }

    // Render the regular post detail page for reading
    return (
      <div className="post">
        <PostBody post={this.props.post} />
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id],
  };
}

export default connect(
  mapStateToProps,
  { fetchPost }
)(PostDetail);
