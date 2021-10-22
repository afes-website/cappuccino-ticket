import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import qs from "qs";
import Top from "components/Top";
import Ticket from "components/Ticket";

const useStyles = makeStyles({
  root: {
    padding: 16,
    height: "100%",
    boxSizing: "border-box",
  },
  copy: {
    display: "block",
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginTop: 16,
  },
  rsvIdNotSet: {
    textAlign: "center",
  },
});

const App: React.VFC = () => {
  const classes = useStyles();

  const [rsvId, setRsvId] = useState<string | null>("");

  useEffect(() => {
    const { id } = qs.parse(location.search.substr(1));
    if (id && typeof id === "string") setRsvId(id);
    else setRsvId(null);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  if (!rsvId) {
    return <Top className={classes.root} />;
  }

  return (
    <div className={classes.root}>
      <Ticket rsvId={rsvId} />
      <span className={classes.copy}>
        © 2021 麻布学園第74回文化祭実行委員会
      </span>
    </div>
  );
};

export default App;

const handleResize = () => {
  const height = window.innerHeight;
  document.documentElement.style.setProperty("--100vh", `${height}px`);
};
