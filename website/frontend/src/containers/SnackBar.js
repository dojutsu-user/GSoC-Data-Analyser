import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ErrorIcon from "@material-ui/icons/Error";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";

const variantIcon = {
  error: ErrorIcon
};

const styles1 = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class ErrorSnackBar extends React.Component {
  state = {
    open: false
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <MySnackbarContentWrapper
          variant="error"
          className={classes.margin}
          message={this.props.errMsg}
        />
      </div>
    );
  }
}

ErrorSnackBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles2)(ErrorSnackBar);
