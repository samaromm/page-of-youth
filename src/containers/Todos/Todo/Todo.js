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

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      startVal: "Tue July 21 2020 19:30:00 GMT+0300 (Arabian Standard Time)",
      endVal: "Wed July 22 2020 19:30:00 GMT+0300 (Arabian Standard Time)",
    };
  }

  toggleAddModal = ({ start, end }) => {
    const startTime = start.toString();
    const endTime = end.toString();
    this.setState({
      startVal: startTime,
      endVal: endTime,
      isOpened: !this.state.isOpened,
    });
  };

  open = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  openModal = () => {
    return (
      <Modal opened={this.state.isOpened} close={() => this.open()}>
        <Heading noMargin size="h1" color="white">
          Add your new todo
        </Heading>
        <Heading bold size="h4" color="white">
          Type your todo and press add
        </Heading>
        <Formik
          initialValues={{
            title: "",
            start: this.state.startVal,
            end: this.state.endVal,
            diary: "",
            complete: "Uncompleted",
          }}
          validationSchema={TodoSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const res = await this.props.addTodo(values);
            setSubmitting(false);
            if (res) {
              this.setState({
                isOpened: false,
              });
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
              <Field
                type="textarea"
                name="diary"
                placeholder="(Optional) Enter your diary for today..."
                component={Input}
                style={{ height: "100px" }}
              />
              <div className="radioButWrapper">
                <label for="Uncompleted" >
                  <Field
                    type="radio"
                    name="complete"
                    id="Uncompleted"
                    value="Uncompleted"
                    checked
                    component={Input}
                    className="radioBut"
                  />
                  <p className="labelText">Uncompleted</p>
                </label>
                <label for="Completed">
                  <Field
                    type="radio"
                    name="complete"
                    id="Completed"
                    value="Completed"
                    component={Input}
                    className="radioBut"
                  />
                  <p className="labelText">Completed</p>
                </label>
              </div>
              <ButtonsWrapper>
                <Button
                  contain
                  color="main"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  loading={this.props.loading ? "Adding..." : null}
                >
                  Add todo
                </Button>
                <Button color="main" contain onClick={() => this.open()}>
                  Cancel
                </Button>
              </ButtonsWrapper>
              <MessageWrapper>
                <Message error show={this.props.error}>
                  {this.props.error}
                </Message>
              </MessageWrapper>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    );
  };

  render() {
    return (
      <>
        <Calendar
          selectable
          localizer={localizer}
          events={this.props.events}
          defaultView={Views.Month}
          views={["month", "agenda"]}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={moment().toDate()}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={this.toggleAddModal}
          style={{ height: "100vh", margin: "20px", width: "100vh" }}
        />
        {this.state.isOpened ? this.openModal() : ""}
      </>
    );
  }
}

const mapStateToProps = ({ todos }) => ({
  loading: todos.loading,
  error: todos.error,
});

const mapDispatchToProps = {
  addTodo: actions.addTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
