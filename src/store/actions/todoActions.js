import * as actions from './actionTypes';

// Add a todo
export const addTodo = data => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.ADD_TODO_START });
  try {
    const res = await firestore
      .collection('todos')
      .doc(userId)
      .get();
    const newTodo = {
      id: new Date().valueOf(),
      title: data.title,
      start:data.start,
      end:data.end,
      diary: data.diary,
      complete: data.complete,
    };
    if (!res.data()) {
      firestore
        .collection('todos')
        .doc(userId)
        .set({
          todos: [newTodo],
        });
    } else {
      firestore
        .collection('todos')
        .doc(userId)
        .update({
          todos: [...res.data().todos, newTodo],
        });
    }
    dispatch({ type: actions.ADD_TODO_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
  }
};

// Delete todo
export const deleteTodo = id => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.DELETE_TODO_START });
  try {
    const res = await firestore
      .collection('todos')
      .doc(userId)
      .get();
    const previousTodos = res.data().todos;
    const newTodos = previousTodos.filter(todo => todo.id !== id);
    await firestore
      .collection('todos')
      .doc(userId)
      .update({
        todos: newTodos,
      });
    dispatch({ type: actions.DELETE_TODO_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.DELETE_TODO_FAIL, payload: err.message });
  }
};

// edit todo
export const editTodo = (id, data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.ADD_TODO_START });
  try {
    const res = await firestore
      .collection('todos')
      .doc(userId)
      .get();
    const todos = res.data().todos;
    const index = todos.findIndex(todo => todo.id === id);
    todos[index].title = data.title;
    todos[index].start=data.start;
    todos[index].end=data.end;
    todos[index].diary=data.diary;
    todos[index].complete= data.complete;

    await firestore
      .collection('todos')
      .doc(userId)
      .update({
        todos,
      });
    dispatch({ type: actions.ADD_TODO_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
  }
};