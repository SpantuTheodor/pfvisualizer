import { render } from "@testing-library/react";
import React from "react";

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: this.props.column,
      row: this.props.row,
      isStart: this.props.isStart,
      isFinish: this.props.isFinish,
      isBlocked: this.props.isBlocked,
      isClicked: this.props.isClicked,
    };
    this.blockNode = this.blockNode.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isClicked !== nextProps.isClicked) {
      this.setState({ isClicked: nextProps.isClicked }, () => {
        console.log(this.state.isClicked);
      });
    }
  }

  extraClassNameFunction() {
    let extraClassName = this.state.isStart
      ? "start"
      : this.state.isFinish
      ? "finish"
      : this.state.isBlocked
      ? "blocked"
      : "";
    return extraClassName;
  }

  blockNode() {
    if (!this.state.isStart && !this.state.isFinish && this.state.isClicked) {
      this.setState({ isBlocked: true });
    }
  }

  render() {
    let extraClassName = this.extraClassNameFunction();
    return (
      <div
        className={"node " + extraClassName}
        onMouseClick={() => this.blockNode()}
        onMouseEnter={() => this.blockNode()}
      ></div>
    );
  }
}

export default Node;
