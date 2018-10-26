import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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
            GSoC Data Analyzer
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">GSoC Overview</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

appbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(appbar);
