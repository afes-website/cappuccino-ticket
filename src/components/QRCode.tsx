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
  data: string | null;
  className?: string;
  hideQR?: boolean;
}

const QRCode: React.VFC<Props> = ({ data, className, hideQR }) => {
  const classes = useStyles();

  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data)
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
      {!hideQR && dataUrl ? (
        <img src={dataUrl} alt={data ?? ""} width="100%" height="auto" />
      ) : (
        <div className={classes.skeletonWrapper}>
          <Skeleton
            variant="rect"
            animation={hideQR ? false : "wave"}
            className={classes.skeleton}
          />
        </div>
      )}
    </div>
  );
};

export default QRCode;
