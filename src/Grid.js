import React from "react";
import Node from "./Node";

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      nodes: [],
      isClicked: false,
    };
    this.onMouseDownFunction = this.onMouseDownFunction.bind(this);
    this.onMouseUpFunction = this.onMouseUpFunction.bind(this);
  }

  onMouseDownFunction() {
    this.setState({ isClicked: true }, () => {
      console.log(this.state.isClicked);
    });
  }

  onMouseUpFunction() {
    this.setState({ isClicked: false }, () => {
      console.log(this.state.isClicked);
    });
  }

  componentDidMount() {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (event.type === "mousedown") {
        this.onMouseDownFunction();
      }
    });
    let nodes = [],
      start_column = 9,
      start_row = 9,
      finish_column = 9,
      finish_row = 30,
      isStart,
      isFinish,
      isBlocked = false;

    for (let column = 0; column < 19; column++) {
      let current_row = [];
      for (let row = 0; row < 40; row++) {
        row === start_row && column === start_column
          ? (isStart = true)
          : (isStart = false);
        row === finish_row && column === finish_column
          ? (isFinish = true)
          : (isFinish = false);
        let current_node = [column, row, isStart, isFinish, isBlocked];
        current_row.push(current_node);
      }
      nodes.push(current_row);
    }
    this.setState({ nodes });
  }

  componentWillUnmount() {
    document.removeEventListener("contextmenu", this._handleContextMenu);
  }

  render() {
    let nodes = this.state.nodes;
    let isClicked = this.state.isClicked;
    return (
      <div
        className="grid"
        onMouseDown={this.onMouseDownFunction}
        onMouseUp={this.onMouseUpFunction}
      >
        {nodes.map((row) => {
          return (
            <div className="row">
              {row.map((index) => {
                return (
                  <Node
                    column={index[0]}
                    row={index[1]}
                    isStart={index[2]}
                    isFinish={index[3]}
                    isBlocked={index[4]}
                    isClicked={isClicked}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
export default Grid;
