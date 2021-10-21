import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
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

const SEARCH_PARAMS_RSV_KEY = "id";

const App: React.VFC = () => {
  const classes = useStyles();

  const [rsvId, setRsvId] = useState<string | null>("");

  const searchParams = useRef(new URLSearchParams(window.location.search));

  useEffect(() => {
    const id = searchParams.current.get(SEARCH_PARAMS_RSV_KEY);
    if (id) setRsvId(id);
    else setRsvId(null);
  }, [searchParams]);

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
    return (
      <div className={classes.root}>
        <p className={classes.rsvIdNotSet}>予約 ID が指定されていません。</p>
      </div>
    );
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
