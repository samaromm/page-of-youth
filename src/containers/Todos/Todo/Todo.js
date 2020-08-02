import React from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import moment from "moment";
import DeleteTodo from "./DeleteTodo";

import "./calender.css";
import Button from "../../../components/UI/Forms/Button/Button";
import Heading from "../../../components/UI/Headings/Heading";
import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Forms/Input/Input";
import Message from "../../../components/UI/Message/Message";
import { StyledForm } from "../../../layout/elements";
import styled from "styled-components";

import * as actions from "../../../store/actions";

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
  title: Yup.string().required("The todo is required.").min(4, "Too short."),
});

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isDeleting: false,
      editTodo: {},
      isOpened: false,
      startVal: "Tue July 21 2020 19:30:00 GMT+0300 (Arabian Standard Time)",
      endVal: "Wed July 22 2020 19:30:00 GMT+0300 (Arabian Standard Time)",
    };
  }

  editEvent = ({ event }) => {
    this.setState(
      {
        isEditing: true,
        editTodo: event,
      },
      this.controlModal()
    );
  };

  toggleAddModal = ({ start, end }) => {
    const startTime = start.toString();
    const endTime = end.toString();
    this.setState({
      startVal: startTime,
      endVal: endTime,
      isOpened: !this.state.isOpened,
    });
  };

  controlModal = () => {
    this.setState({
      isOpened: !this.state.isOpened,
      isEditing: false,
      isDeleting: false,
    });
  };

  close=()=>{
    this.setState({
      isOpened: false,
      isEditing: false,
      isDeleting: false,
    });
  }

  openModal = () => {
    return (
      <Modal opened={this.state.isOpened} close={() => this.controlModal()}>
        <Heading noMargin size="h1" color="white">
          {this.state.isEditing ? "Edit your todo" : "Add your new todo"}
        </Heading>
        <Heading bold size="h4" color="white">
          {this.state.isEditing
            ? "Edit your todo and tap edit"
            : "Type your todo and press add"}
        </Heading>
        <Formik
          initialValues={{
            title: this.state.isEditing ? this.state.editTodo.title : "",
            start: this.state.isEditing
              ? this.state.editTodo.start
              : this.state.startVal,
            end: this.state.isEditing
              ? this.state.editTodo.end
              : this.state.endVal,
            diary: this.state.isEditing ? this.state.editTodo.diary : "",
            complete: this.state.isEditing
              ? this.state.editTodo.complete
              : "false",
          }}
          validationSchema={TodoSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const res = this.state.isEditing
              ? await this.props.editTodoAction(this.state.editTodo.id, values)
              : await this.props.addTodo(values);
            if (res) {
              this.setState({
                isOpened: false,
                isEditing: false,
              });
            }
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting, isValid, resetForm }) => (
            <StyledForm>
              <Field
                type="text"
                name="title"
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
                <label for="complete">
                  <Field
                    type="checkbox"
                    name="complete"
                    id="complete"
                    value="complete"
                    component={Input}
                    className="radioBut"
                    defaultChecked={
                      this.state.isEditing
                        ? this.state.editTodo.complete
                        : "false"
                    }
                  />
                  Completed
                </label>
              </div>
              <ButtonsWrapper>
                <Button
                  contain
                  color="main"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  loading={this.props.loading ? "Saving..." : null}
                >
                  {this.state.isEditing ? "Edit todo" : "Add todo"}
                </Button>
                <Button
                  color="main"
                  contain
                  onClick={() => {
                    this.setState({ isDeleting: true});
                    resetForm();
                  }}
                  className={!this.state.isEditing ? "hideButton" : ""}
                >
                  Delete
                </Button>
                <Button
                  color="main"
                  contain
                  onClick={() => {
                    this.controlModal();
                    resetForm();
                  }}
                >
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
          onSelectEvent={(event) => this.editEvent({ event })}
          onSelectSlot={this.toggleAddModal}
          style={{ height: "100vh", margin: "20px", width: "100vh" }}
          eventPropGetter={(event, start, end, isSelected) => {
            let newStyle = {
              backgroundColor: "#F43F54",
            };
            if (event.complete) {
              newStyle.backgroundColor = "#1ec91e";
            }
            return {
              className: "",
              style: newStyle,
            };
          }}
        />
        {this.state.isOpened ? this.openModal() : ""}
        <DeleteTodo
          todo={this.state.editTodo}
          show={this.state.isDeleting}
          close={() => this.close()}
        />
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
  editTodoAction: actions.editTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);