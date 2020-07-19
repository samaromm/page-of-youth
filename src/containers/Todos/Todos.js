import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import AddTodo from "./AddTodo/AddTodo";

const Todos = ({ todos, requesting, requested, userId }) => {
  let objArr = [];
  if (todos && !(!todos[userId] || requested[`todos/${userId}`])) {
    todos[userId].todos.map((todo) =>
      objArr.push({
        title: todo.title,
        id: todo.id,
        start: todo.start,
        end: todo.end,
      })
    );
  }

  return (
    <>
      <AddTodo events={objArr} />
    </>
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
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [`todos/${props.userId}`])
)(Todos);
