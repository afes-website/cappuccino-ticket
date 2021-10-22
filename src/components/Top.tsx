import React from "react";
import { ReactComponent as Logo } from "assets/logo.svg";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const Top: React.VFC<{ className?: string }> = ({ className }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Logo className={classes.logo} />
      <h2 className={classes.title}>デジタルチケット</h2>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fill: "#737474",
    width: "50%",
  },
  title: {
    fontWeight: 500,
    fontSize: 15,
    color: "#737474",
    transform: "rotate(4.4deg)",
    marginTop: -2,
  },
});

export default Top;
