import React, { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import moment from "moment";

import "./calender.css";
import Button from "../../../components/UI/Forms/Button/Button";
import Heading from "../../../components/UI/Headings/Heading";
import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Forms/Input/Input";
import Message from "../../../components/UI/Message/Message";
import { StyledForm } from "../../../layout/elements";
import styled from "styled-components";

import * as actions from "../../../store/actions/";

const localizer = momentLocalizer(moment);
const propTypes = {};

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
  width: 100%;
  padding: 0 3rem;
`;

const TodoSchema = Yup.object().shape({
  todo: Yup.string().required("The todo is required.").min(4, "Too short."),
});

const AddTodo = ({ events, addTodo, loading, error }) => {
  const [isOpened, setisOpened] = useState(false);
  const [startVal, setStartVal] = useState(moment().toDate());
  const [endVal, setEndVal] = useState(moment().toDate());

  const toggleAddModal = ({ start, end }) => {
    setisOpened(!isOpened);
    setStartVal(start);
    setEndVal(end)
    {console.log(events)}
  };

  return (
    <>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.Month}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={moment().toDate()}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={toggleAddModal}
        style={{ height: "100vh", margin: "20px", width: "100vh" }}
      />
      <Modal
        opened={isOpened}
        close={() => setisOpened(false)}
        toggle={toggleAddModal}
      >
        <Heading size="h1">Add your new todo</Heading>
        
        {console.log(startVal+" "+endVal)}
        <Formik
          initialValues={{
            title: "gewfewf",
            start: startVal,
            end: endVal,
          }}
          validationSchema={TodoSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // send our todo
            const res = await addTodo(values);
            setSubmitting(false);
            if (res) {
              setisOpened(false);
            }
            resetForm();
          }}
        >
          {({ isSubmitting, isValid, resetForm }) => (
            <StyledForm>
              <Field
                type="text"
                name="todo"
                placeholder="Write your todo..."
                component={Input}
              />
              <ButtonsWrapper>
                <Button
                  contain
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  loading={loading ? "Adding..." : null}
                >
                  Add todo
                </Button>
                <Button contain onClick={() => {setisOpened(false);  resetForm();}}>
                  Cancel
                </Button>
              </ButtonsWrapper>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    </>
  );
};

AddTodo.propTypes = propTypes;

const mapStateToProps = ({ todos }) => ({
  loading: todos.loading,
  error: todos.error,
});

const mapDispatchToProps = {
  addTodo: actions.addTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
