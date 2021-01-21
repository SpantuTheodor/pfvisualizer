import React from "react";

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.key,
      column: this.props.column,
      row: this.props.row,
      isStart: this.props.isStart,
      isFinish: this.props.isFinish,
      isBlocked: this.props.isBlocked,
      isVisited: this.props.isVisited,
      handleMouseDown: this.props.handleMouseDown,
      handleMouseOver: this.props.handleMouseOver,
      handleMouseUp: this.props.handleMouseUp,
      handleMouseLeave: this.props.handleMouseLeave,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        isStart: nextProps.isStart,
        isFinish: nextProps.isFinish,
        isBlocked: nextProps.isBlocked,
        isVisited: nextProps.isVisited,
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.isBlocked !== nextProps.isBlocked ||
      this.props.isStart !== nextProps.isStart ||
      this.props.isFinish !== nextProps.isFinish ||
      this.props.isVisited !== nextProps.isVisited
    );
  }

  extraClassNameFunction() {
    let extraClassName = this.state.isStart
      ? "start"
      : this.state.isFinish
      ? "finish"
      : this.state.isBlocked
      ? "blocked"
      : this.state.isVisited
      ? "visited"
      : "";
    return extraClassName;
  }

  render() {
    let extraClassName = this.extraClassNameFunction();
    const handleMouseDown = this.state.handleMouseDown,
      handleMouseOver = this.state.handleMouseOver,
      handleMouseUp = this.state.handleMouseUp,
      handleMouseLeave = this.state.handleMouseLeave;
    return (
      <div
        className={"node " + extraClassName}
        onMouseDown={(event) =>
          handleMouseDown(
            event,
            this.state.column,
            this.state.row,
            this.state.isStart,
            this.state.isFinish
          )
        }
        onMouseOver={() =>
          handleMouseOver(
            this.state.column,
            this.state.row,
            this.state.isStart,
            this.state.isFinish
          )
        }
        onMouseLeave={() =>
          handleMouseLeave(
            this.state.column,
            this.state.row,
            this.state.isStart,
            this.state.isFinish
          )
        }
        onMouseUp={() =>
          handleMouseUp(
            this.state.column,
            this.state.row,
            this.state.isStart,
            this.state.isFinish
          )
        }
      ></div>
    );
  }
}

export default Node;
