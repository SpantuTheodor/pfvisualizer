import React from "react";
import Node from "./Node";
import dijkstra from "./algorithms/unweighted/dijkstra.js";

import { connect } from "react-redux";
import {
  mouse_click,
  erase,
  dragging_start,
  dragging_finish,
  visualize_true,
  visualize_false,
} from "./actions";

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      nodes: [],
      lastNodeDraggedOver: [],
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseDown(event, column, row, isStart, isFinish) {
    this.props.mouse_click();
    if (isStart) {
      let auxiliary = this.state.nodes.slice();
      auxiliary[column][row][2] = false;
      this.props.dragging_start();
      this.setState({
        nodes: auxiliary,
      });
    } else if (isFinish) {
      let auxiliary = this.state.nodes.slice();
      auxiliary[column][row][3] = false;
      this.props.dragging_finish();
      this.setState({
        nodes: auxiliary,
      });
    } else {
      let auxiliary = this.state.nodes.slice();

      // Left Click Case
      if (event.nativeEvent.which === 1) {
        auxiliary[column][row][4] = true;
        this.setState({
          nodes: auxiliary,
        });
      }

      // Right Click Case
      if (event.nativeEvent.which === 3) {
        this.props.erase();
        auxiliary[column][row] = false;
        this.setState({
          nodes: auxiliary,
        });
      }
    }
  }

  handleMouseOver(column, row, isStart, isFinish) {
    // Dragging the start node case
    if (this.props.isDraggingStart) {
      let auxiliary = this.state.nodes.slice();
      auxiliary[column][row][2] = true;
      this.setState({
        nodes: auxiliary,
      });

      // Dragging the finish node case
    } else if (this.props.isDraggingFinish) {
      let auxiliary = this.state.nodes.slice();
      auxiliary[column][row][3] = true;
      this.setState({
        nodes: auxiliary,
      });

      // Blocking or erasing case
    } else {
      let auxiliary = this.state.nodes.slice();
      if (!isStart && !isFinish && this.props.isClicked) {
        if (this.props.isErasing) {
          auxiliary[column][row][4] = false;
        } else {
          auxiliary[column][row][4] = true;
        }
        this.setState({ nodes: auxiliary });
      }
    }
  }

  handleMouseUp(column, row, isStart, isFinish) {
    this.props.mouse_click();
    let auxiliary = this.state.nodes.slice();

    // Dragging the start node case
    if (this.props.isDraggingStart) {
      if (isFinish) {
        auxiliary[this.state.lastNodeDraggedOver[0]][
          this.state.lastNodeDraggedOver[1]
        ][2] = true;
        auxiliary[column][row][2] = false;
        this.props.dragging_start();
        this.setState({
          nodes: auxiliary,
        });
      } else if (!isFinish) {
        auxiliary[column][row][2] = true;
        this.props.dragging_start();
        this.setState({
          nodes: auxiliary,
        });
      }

      // Dragging the finish node case
    } else if (this.props.isDraggingFinish) {
      if (isStart) {
        auxiliary[this.state.lastNodeDraggedOver[0]][
          this.state.lastNodeDraggedOver[1]
        ][3] = true;
        auxiliary[column][row][3] = false;
        this.props.dragging_finish();
        this.setState({
          nodes: auxiliary,
        });
      } else if (!isStart) {
        auxiliary[column][row][3] = true;
        this.props.dragging_finish();
        this.setState({
          nodes: auxiliary,
        });
      }
    }

    // Erasing case
    if (this.props.isErasing) {
      this.props.erase();
    }
  }

  handleMouseLeave(column, row) {
    // Dragging start case
    let auxiliary = this.state.nodes.slice();
    if (this.props.isDraggingStart) {
      auxiliary[column][row][2] = false;
      let lastNodeDraggedOver = [];
      lastNodeDraggedOver.push(column);
      lastNodeDraggedOver.push(row);
      this.setState({
        lastNodeDraggedOver: lastNodeDraggedOver,
        nodes: auxiliary,
      });
    }

    // Dragging finish case
    if (this.props.isDraggingFinish) {
      auxiliary[column][row][3] = false;
      let lastNodeDraggedOver = [];
      lastNodeDraggedOver.push(column);
      lastNodeDraggedOver.push(row);
      this.setState({
        lastNodeDraggedOver: lastNodeDraggedOver,
        nodes: auxiliary,
      });
    }
  }

  componentDidMount() {
    document.addEventListener("contextmenu", (event) => {
      //event.preventDefault();
      //event.stopPropagation();
    });

    let nodes = [],
      start_column = 12,
      start_row = 15,
      finish_column = 12,
      finish_row = 45,
      isStart,
      isFinish,
      isBlocked = false,
      isVisited = false;
    for (let column = 0; column < 25; column++) {
      let current_row = [];
      for (let row = 0; row < 58; row++) {
        row === start_row && column === start_column
          ? (isStart = true)
          : (isStart = false);
        row === finish_row && column === finish_column
          ? (isFinish = true)
          : (isFinish = false);
        let current_node = [
          column,
          row,
          isStart,
          isFinish,
          isBlocked,
          isVisited,
        ];
        current_row.push(current_node);
      }
      nodes.push(current_row);
    }
    this.setState({ nodes });
  }

  componentWillReceiveProps(nextProps) {
    let auxiliary = this.state.nodes.slice();
    if (this.props.isVisualizing !== nextProps.isVisualizing) {
      let visited_nodes = dijkstra(this.state.nodes);
      for (let i in visited_nodes) {
        setTimeout(() => {
          auxiliary[visited_nodes[i][0]][visited_nodes[i][1]][5] = true;
          this.setState({
            nodes: auxiliary,
          });
        }, 50);
      }
    }
  }

  render() {
    let nodes = this.state.nodes;

    return (
      <div id="grid">
        {nodes.map((row, key_column) => {
          return (
            <div className="row" key={key_column}>
              {row.map((index, key_row) => {
                return (
                  <Node
                    key={key_row}
                    column={index[0]}
                    row={index[1]}
                    isStart={index[2]}
                    isFinish={index[3]}
                    isBlocked={index[4]}
                    isVisited={index[5]}
                    handleMouseDown={this.handleMouseDown}
                    handleMouseOver={this.handleMouseOver}
                    handleMouseUp={this.handleMouseUp}
                    handleMouseLeave={this.handleMouseLeave}
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

const mapStateToProps = (state) => ({
  isClicked: state.isClicked,
  isErasing: state.isErasing,
  isDraggingStart: state.isDraggingStart,
  isDraggingFinish: state.isDraggingFinish,
  isVisualizing: state.isVisualizing,
});

export default connect(mapStateToProps, {
  mouse_click,
  erase,
  dragging_start,
  dragging_finish,
  visualize_true,
  visualize_false,
})(Grid);
