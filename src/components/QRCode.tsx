import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import qrcode from "qrcode";
import clsx from "clsx";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: "1 / 1",
  },
  skeletonWrapper: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: "5%",
  },
  skeleton: {
    width: "100%",
    height: "100%",
  },
});

export interface Props {
  data: string;
  className?: string;
}

const QRCode: React.VFC<Props> = ({ data, className }) => {
  const classes = useStyles();

  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    qrcode.toDataURL(
      data,
      {
        errorCorrectionLevel: "Q",
        scale: 20,
      },
      (e, url) => {
        setDataUrl(url);
      }
    );
  }, [data]);

  return (
    <div className={clsx(classes.root, className)}>
      {dataUrl ? (
        <img src={dataUrl} alt={data} width="100%" height="auto" />
      ) : (
        <div className={classes.skeletonWrapper}>
          <Skeleton variant="rect" className={classes.skeleton} />
        </div>
      )}
    </div>
  );
};

export default QRCode;
