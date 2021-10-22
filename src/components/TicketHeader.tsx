import React from "react";
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Reservation } from "@afes-website/docs";
import clsx from "clsx";
import { ReactComponent as LogoWhite } from "assets/logo.svg";
import { ReactComponent as Person } from "assets/person.svg";
import { ReactComponent as Child } from "assets/child.svg";
import { stringDate, stringTime } from "libs/stringDateTime";
import termColor from "libs/termColor";

const useStyles = makeStyles({
  ticketHeader: {
    borderRadius: "16px 16px 0 0",
    padding: "64px 24px 24px 24px",
    color: "#fff",
    fontWeight: 700,
    fontSize: 24,
    position: "relative",
    transition: "background 1s",
  },
  ticketLogo: {
    position: "absolute",
    top: 16,
    left: 16,
    height: 36,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > svg": {
      height: 36,
      fill: "#fff",
    },
    "& > span": {
      fontSize: 16,
      paddingLeft: 8,
    },
  },
  ticketHeaderContent: {
    display: "flex",
    flexDirection: "column",
  },
  ticketMemberAll: {
    position: "absolute",
    right: 12,
    bottom: 20,
    opacity: 0.8,
    fill: "#fff",
    width: 100,
    height: 100,
  },
  cutLine: {
    position: "relative",
    "&::after": {
      background:
        "radial-gradient(circle farthest-side, #d5d5d5, #d5d5d5 60%, transparent 60%, transparent);",
      backgroundSize: "12px 12px",
      backgroundPosition: "center",
      content: "''",
      display: "inline-block",
      position: "absolute",
      width: "100%",
      height: 12,
      left: 0,
      bottom: -6,
    },
  },
});

interface Props {
  rsv: Reservation | null;
}

const TicketHeader: React.VFC<Props> = ({ rsv }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.ticketHeader, classes.cutLine)}
      style={{
        background: termColor(rsv?.term.guest_type),
      }}
    >
      <div className={classes.ticketLogo}>
        <LogoWhite />
        <span>デジタルチケット</span>
      </div>
      <span className={classes.ticketMemberAll}>
        {rsv && (rsv.member_all === 1 ? <Person /> : <Child />)}
      </span>
      <div className={classes.ticketHeaderContent}>
        <span>
          {rsv ? (
            stringDate(rsv.term.enter_scheduled_time)
          ) : (
            <Skeleton width={180} height={36} />
          )}
        </span>
        <span>
          {rsv ? (
            `${stringTime(rsv.term.enter_scheduled_time)} ～ ${stringTime(
              rsv.term.exit_scheduled_time
            )}`
          ) : (
            <Skeleton width={180} height={36} />
          )}
        </span>
      </div>
    </div>
  );
};

export default TicketHeader;
