import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import qrcode from "qrcode";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
        errorCorrectionLevel: "high",
        scale: 15,
      },
      (e, url) => {
        setDataUrl(url);
      }
    );
  }, [data]);

  return (
    <div className={clsx(classes.root, className)}>
      {dataUrl && <img src={dataUrl} alt={data} width="100%" />}
    </div>
  );
};

export default QRCode;
