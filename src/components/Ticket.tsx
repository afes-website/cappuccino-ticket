import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import api, { Reservation } from "@afes-website/docs";
import aspida from "@aspida/axios";
import { ReactComponent as LogoWhite } from "assets/logo_w.svg";
import QRCode from "components/QRCode";
import isAxiosError from "libs/isAxiosError";
import { stringDate, stringTime } from "libs/stringDateTime";
import termColor from "libs/termColor";

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
  ticketError: {
    background: "#fdecea",
    color: "#611a15",
    padding: "24px 32px",
    "& p": {
      fontSize: 16,
    },
  },
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

  const [rsv, setRsv] = useState<Reservation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api(aspida())
      .reservations._id(rsvId)
      .check.$get()
      .then(({ reservation }) => {
        setRsv(reservation);
      })
      .catch((e) => {
        if (isAxiosError(e)) {
          if (e.response?.status) {
            switch (e.response.status) {
              case 404:
                setError("予約が見つかりませんでした。");
                break;
              case 500:
                setError("サーバーエラーです。");
                break;
              default:
                setError("原因不明のエラーです。");
            }
          }
        } else {
          setError("原因不明のエラーです。");
        }
      });
  }, [rsvId]);

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.ticket}>
        {error ? (
          <div className={classes.ticketError}>
            <p>{error}</p>
            <p>
              問題が解決しない場合は、麻布学園文化祭予約担当までお問い合わせください。
            </p>
            <p>
              メール: <span className="monospace">74afes@example.com</span>
            </p>
            <p>
              予約 ID: <span className="monospace">{rsvId}</span>
            </p>
          </div>
        ) : (
          <>
            <div
              className={clsx(classes.ticketHeader, classes.cutLine)}
              style={{
                background: termColor(rsv?.term.guest_type),
              }}
            >
              <LogoWhite className={classes.ticketLogo} />
              <span className={classes.ticketMemberAll}>
                {rsv && rsv.member_all}
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
                    `${stringTime(
                      rsv.term.enter_scheduled_time
                    )} ～ ${stringTime(rsv.term.exit_scheduled_time)}`
                  ) : (
                    <Skeleton width={180} height={36} />
                  )}
                </span>
              </div>
            </div>
            <div className={classes.ticketBody}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <QRCode data={rsvId} className={classes.qrCode} />
                  <span className={clsx(classes.rsvId, "monospace")}>
                    {rsvId}
                  </span>
                </Grid>
                <Grid item xs={6}>
                  <p>
                    {rsv ? (
                      `上記の日時・時間に、${rsv.member_all} 名までご入場いただけます。`
                    ) : (
                      <>
                        <Skeleton height={21} />
                        <Skeleton height={21} />
                        <Skeleton height={21} width={100} />
                      </>
                    )}
                  </p>
                  <p>
                    スマートフォンなどで表示するか、印刷してお持ちください。
                  </p>
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Ticket;
