import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';


//  BASE URL : https://practiceapi.devmountain.com/api

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }


  
  // Add axios to the project using npm install axios.
  // Open ./src/components/App.js.
  // Import axios into the component.
  // Use axios and the API documentation to fetch posts in the componentDidMount method.
  //     Set the posts array returned from the API onto posts on state.
  // Import the Post component.
  // Underneath the Compose component, map over posts on state and render a Post component for each post.
  //     Remember that React requires a unique key property when using a map.

  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then ( results => {
      this.setState({ posts: results.data });
    });
  }

  
// Let's begin by opening ./src/components/App.js. In the updatePost method, we'll need to use axios to make a PUT request to the API. Using the API documentation, we can see that when editing a post the API is expecting a PUT request at https://practiceapi.devmountain.com/api/posts. We can also see that the endpoint uses the request query to determine the post id and uses the request body to determine the post text. Because the id and text of the post will be different every time the method is called we should use an id and text parameter for the method.

  // We can then use these parameters to construct our axios request and use the returned data to update posts on state. When using axios.put() the second argument is the request body.
  updatePost(id, text) {
  axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id}`, {text}).then ( results => {
    this.setState({ posts: results.data });
  });
  }

  deletePost( id ) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then( results => {
      this.setState({ posts: results.data});
    });

  }

  createPost( text ) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( results=> {
      this.setState({ posts: results.data });
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost } />
          {
            posts.map ( post => (
              <Post key= {post.id} 
              id={ post.id }
              text={ post.text} 
              date={ post.date } 
              updatePostFn={ this.updatePost }
              deletePostFn={ this.deletePost } />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
