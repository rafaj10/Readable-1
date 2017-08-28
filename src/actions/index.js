import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const EDIT_POST = 'edit_post';
export const DELETE_POST = 'delete_post';
export const UPVOTE_POST = 'upvote_post';
export const DOWNVOTE_POST = 'downvote_post';

export const FETCH_CATEGORIES = 'fetch_categories';

const ROOT_URL = 'https://udacity-react-project2-dustindavignon.c9users.io:8081';
const AUTH_HEADERS = { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', };

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() + s4();
}

/*
Actions for posts
*/

export function fetchPosts() {
        
    return dispatch => {
        axios.get(`${ROOT_URL}/posts`)
            .then(res => dispatch(fetchPostsSuccess(res.data)));
        
    }
}

export function fetchPost(id) {
        
    return dispatch => {
        axios.get(`${ROOT_URL}/posts/${id}`)
            .then(res => dispatch(fetchPostSuccess(res.data)));
        
    }
}

export function createPost(values, callback) {
    const { title, body, author, category } = values;
    
    const data = {
        id: guid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        deleted: false,
        category
    }
        
    return dispatch => {
        axios.post(`${ROOT_URL}/posts`, data)
            .then(res => {
                callback();
                dispatch(createPostSuccess(res.data));
            });
        
    }
}

export function editPost(id, values, callback) {
  
    return dispatch => {
        axios.put(`${ROOT_URL}/posts/${id}`, values)
            .then(res => {
                callback();
                dispatch(editPostSuccess(res.data))
            });
        
    }
}

export function deletePost(id, callback) {

    return dispatch => {
        axios.delete(`${ROOT_URL}/posts/${id}`)
            .then(res => {
                callback();
                dispatch(deletePostSuccess(id));
            });        
    }
}

function fetchPostsSuccess(data) {
    return {
        type: FETCH_POSTS,
        payload: data
    };
}

function fetchPostSuccess(data) {
    return {
        type: FETCH_POST,
        payload: data
    };
}

function createPostSuccess(data) {
    return {
        type: CREATE_POST,
        payload: data
    };
}

function editPostSuccess(data) {
    return {
        type: EDIT_POST,
        payload: data
    }
}

function deletePostSuccess(data) {
    return {
        type: DELETE_POST,
        payload: data
    }
}

/*
Actions for categories
*/

export function fetchCategories() {
        
    return dispatch => {
        axios.get(`${ROOT_URL}/categories`)
            .then(res => dispatch(fetchCategoriesSuccess(res.data)));
        
    }
}

function fetchCategoriesSuccess(data) {
    return {
        type: FETCH_CATEGORIES,
        payload: data
    };
}
