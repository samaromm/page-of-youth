import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Todo from './Todo/Todo.js';

const Todos = ({ todos, requested, userId }) => {
  let content=[]
  if(todos && !((!todos[userId] && requested[`todos/${userId}`]) ||
  todos[userId].todos.length === 0)) {
        todos[userId].todos.map(todo => (
          content.push({
            title: todo.title,
            id: todo.id,
            start: todo.start,
            end: todo.end,
            diary: todo.diary,
            complete: todo.complete
          })
      ))
    };

    return (
      <Todo events={content}/>
    );
};  

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  todos: firestore.data.todos,
  requesting: firestore.status.requesting,
  requested: firestore.status.requested,
});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [`todos/${props.userId}`])
)(Todos);