import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import api, { Reservation } from "@afes-website/docs";
import aspida from "@aspida/axios";
import axios from "axios";
import QRCode from "components/QRCode";
import TicketHeader from "components/TicketHeader";
import { getReservationFromLS, setReservationToLS } from "libs/localStorage";
import parseRsvId from "libs/parseRsvId";

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
  ticketBody: {
    padding: 16,
  },
  qrCodeWrapper: {
    position: "relative",
    width: "100%",
    "& > span": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "70%",
      fontWeight: 500,
      color: "#555",
    },
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
});

export interface Props {
  rsvId: string;
  className?: string;
}

type Reliability = "SERVER" | "NOT_FOUND" | "NETWORK_ERROR" | "LOCAL_STORAGE";

const Ticket: React.VFC<Props> = ({ rsvId, className }) => {
  const classes = useStyles();

  const [rsv, setRsv] = useState<Reservation | null>(getReservationFromLS());
  const [reliability, setReliability] = useState<Reliability | null>(
    "LOCAL_STORAGE"
  );

  useEffect(() => {
    if (rsv?.id !== rsvId) {
      setRsv(null);
      setReservationToLS(null);
    }
  }, [rsv?.id, rsvId]);
  useEffect(() => {
    api(aspida())
      .reservations._id(rsvId)
      .check.$get()
      .then(({ reservation }) => {
        setRsv(reservation);
        setReliability("SERVER");
        setReservationToLS(reservation);
      })
      .catch((e) => {
        setRsv(parseRsvId(rsvId));
        if (axios.isAxiosError(e) && e.response?.status === 404) {
          setReliability("NOT_FOUND");
        } else {
          setReliability("NETWORK_ERROR");
        }
      });
  }, [rsvId]);

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.ticket}>
        <TicketHeader rsv={rsv} />
        <div className={classes.ticketBody}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={10}>
              <div className={classes.qrCodeWrapper}>
                <QRCode
                  data={`${rsvId};${JSON.stringify(rsv)}`}
                  className={classes.qrCode}
                  hideQR={
                    !(
                      reliability === "SERVER" ||
                      reliability === "LOCAL_STORAGE"
                    )
                  }
                />
                {reliability === "NETWORK_ERROR" && (
                  <span>
                    QRコードの生成で問題が発生しました。
                    <br />
                    時間を置いて再度お試しください。
                  </span>
                )}
                {reliability === "NOT_FOUND" && (
                  <span>
                    予約が見つかりませんでした。
                    <br />
                    ○○までお問い合わせください。
                  </span>
                )}
              </div>
              <span className={clsx(classes.rsvId, "monospace")}>{rsvId}</span>
            </Grid>
            <Grid item xs={12}>
              <p>
                {rsv ? (
                  `上記の日時に、${rsv.member_all} 名までご入場いただけます。`
                ) : (
                  <Skeleton height={21} />
                )}
              </p>
              <p>スマートフォンなどで表示するか、印刷してお持ちください。</p>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
