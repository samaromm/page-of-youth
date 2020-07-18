import React from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./calender.css";
import events from "../todos";

const localizer = momentLocalizer(moment);
const propTypes = {};

class Selectable extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { events };
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      });
  };

  render() {
    return (
      <>
        <Calendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={Views.Month}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={moment().toDate()}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={this.handleSelect}
          style={{ height: "120vh", margin: "20px" }}
        />
      </>
    );
  }
}

Selectable.propTypes = propTypes;

export default Selectable;
