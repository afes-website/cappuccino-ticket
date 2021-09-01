import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import QRCode from "components/QRCode";
import { ReactComponent as LogoWhite } from "assets/logo_w.svg";

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
  ticket: {
    borderRadius: 16,
    padding: 0,
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  ticketHeader: {
    borderRadius: "16px 16px 0 0",
    padding: "64px 24px 24px 24px",
    color: "#fff",
    fontWeight: 700,
    fontSize: 24,
    position: "relative",
  },
  ticketLogo: {
    position: "absolute",
    top: 16,
    left: 16,
    height: 36,
  },
  ticketHeaderContent: {
    display: "flex",
    flexDirection: "column",
  },
  ticketMemberAll: {
    position: "absolute",
    fontSize: 200,
    right: -24,
    top: -24,
    opacity: 0.75,
  },
  ticketBody: {
    padding: 16,
  },
  qrCode: {
    width: "100%",
    margin: "0 auto",
  },
  rsvId: {
    fontFamily: '"Roboto Mono", monospace',
    textAlign: "center",
    display: "block",
    fontSize: 14,
    marginBottom: 8,
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

export interface Props {
  rsvId: string;
  className?: string;
}

const Ticket: React.VFC<Props> = ({ rsvId, className }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.ticket}>
        <div
          className={clsx(classes.ticketHeader, classes.cutLine)}
          style={{
            background: "#2196F3",
          }}
        >
          <LogoWhite className={classes.ticketLogo} />
          <span className={classes.ticketMemberAll}>2</span>
          <div className={classes.ticketHeaderContent}>
            <span>10 月 2 日（土）</span>
            <span>9:00 ～ 11:00</span>
          </div>
        </div>
        <div className={classes.ticketBody}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <QRCode data={rsvId} className={classes.qrCode} />
              <span className={classes.rsvId}>{rsvId}</span>
            </Grid>
            <Grid item xs={6}>
              <p>上記の日時・時間に、2 名までご入場いただけます。</p>
              <p>スマートフォンなどで表示するか、印刷してお持ちください。</p>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
