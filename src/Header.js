import React from "react";
import { connect } from "react-redux";
import { visualize_true } from "./actions";

function Header(props) {
  return (
    <div id="header">
      <div id="visualize" onClick={() => props.visualize_true()}>
        <p> Visualize </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isVisualizing: state.isVisualizing,
});

export default connect(mapStateToProps, {
  visualize_true,
})(Header);
