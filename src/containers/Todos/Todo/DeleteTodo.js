import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Modal from "../../../components/UI/Modal";
import Button from "../../../components/UI/Forms/Button/Button";
import Heading from "../../../components/UI/Headings/Heading";
import Message from "../../../components/UI/Message/Message";
import * as actions from "../../../store/actions";

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

const TodoWrapper = styled.div`
  margin: 1rem 0rem;
  font-size: 2rem;
  text-align: center;
  color: #f43f54;
`;

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  padding: 0 3rem;
`;

const DeleteTodo = ({ show, close, todo, deleteTodo, error, loading }) => {
  return (
    <Modal opened={show} close={close}>
      <Heading noMargin size="h1" color="white">
        Deleting todo
      </Heading>
      <Heading bold size="h4" color="white">
        Are you sure you want to delete this todo?
      </Heading>
      <TodoWrapper>{todo.title}</TodoWrapper>
      <ButtonsWrapper>
        <Button
          contain
          onClick={async () => {
              await deleteTodo(todo.id);
              window.location.reload(false);
          }}
          disabled={loading}
          loading={loading ? "Deleting..." : null}
        >
          Delete
        </Button>
        <Button color="main" contain onClick={close}>
          Cancel
        </Button>
      </ButtonsWrapper>
      <MessageWrapper>
        <Message error show={error}>
          {error}
        </Message>
      </MessageWrapper>
    </Modal>
  );
};

const mapStateToProps = ({ todos }) => ({
  error: todos.deleteTodo.error,
  loading: todos.deleteTodo.loading,
});

const mapDispatchToProps = {
  deleteTodo: actions.deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTodo);
