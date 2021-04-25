import axios from "axios";
import { FETCH_POSTS, CREATE_POST, FETCH_POST } from "./types";

const ROOT_URL = "/api";

/**
 * Blog Post
 */

export function fetchPosts() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      dispatch({
        type: FETCH_POSTS,
        payload: response.data,
      });
    });
  };
}

export function createPost(
  { name, title, categories, content },
  historyPush,
  historyReplace
) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/posts`, {
        name,
        title,
        categories,
        content,
      })
      .then((response) => {
        // If create post succeed, navigate to the post detail page
        dispatch({
          type: CREATE_POST,
          payload: response.data,
        });
        historyPush(`/posts/${response.data._id}`);
      })
      .catch(({ response }) => {
        // If create post failed, alert failure message
        historyReplace("/posts/new", {
          time: new Date().toLocaleString(),
          message: response.data.message,
        });
      });
  };
}

export function fetchPost(id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      // console.log(response);
      dispatch({
        type: FETCH_POST,
        payload: response.data,
      });
    });
  };
}
