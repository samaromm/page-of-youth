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
  const [startVal, setStartVal] = useState("Tue July 21 2020 19:30:00 GMT+0300 (Arabian Standard Time)");
  const [endVal, setEndVal] = useState("Wed July 22 2020 19:30:00 GMT+0300 (Arabian Standard Time)");

  const toggleAddModal = ({ start, end }) => {
    setisOpened(!isOpened);
    setStartVal(start.toString());
    setEndVal(end.toString())
  };

  return (
    <>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.Month}
        views={['month', 'agenda']}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={moment().toDate()}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={toggleAddModal}
        style={{ height: "100vh", margin: "20px", width: "100vh" }}
      />
      <Modal opened={isOpened} close={() => setisOpened(false)}>
        <Heading noMargin size="h1" color="white">
          Add your new todo
          {console.log(startVal)}
        </Heading>
        <Heading bold size="h4" color="white">
          Type your todo and press add
        </Heading>
        <Formik
          initialValues={{
            title: '',
            start:startVal,
            end:endVal
          }}
          validationSchema={TodoSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const res = await addTodo(values);
            setSubmitting(false);
            if (res) {
              setisOpened(false);
            }
            resetForm();
          }}
        >
          {({ isSubmitting, isValid }) => (
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
                  color="main"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  loading={loading ? 'Adding...' : null}
                >
                  Add todo
                </Button>
                <Button color="main" contain onClick={() => setisOpened(false)}>
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

const mapStateToProps = ({ todos }) => ({
  loading: todos.loading,
  error: todos.error,
});

const mapDispatchToProps = {
  addTodo: actions.addTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
