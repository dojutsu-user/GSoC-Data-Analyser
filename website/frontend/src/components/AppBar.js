import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

const appbar = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
              <span className="logo">GSoC Data Analyzer</span>
            </NavLink>
          </Typography>
          <NavLink
            to="/overview/gsoc"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button color="inherit">GSoC Overview</Button>
          </NavLink>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

appbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(appbar);
