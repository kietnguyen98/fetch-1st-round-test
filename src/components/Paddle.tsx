import { useEffect, useState } from "react";
import { TPosition } from "../type";

type TPaddleProps = {
  id: string;
  position: TPosition;
  width: number;
  height: number;
  rate: number;
  label: string;
  color: string;
  isHit: boolean;
  resetPaddleIsHit: () => void;
};

export const Paddle = (props: TPaddleProps) => {
  const { position, width, height, label, color, isHit, resetPaddleIsHit } =
    props;
  const [isShrink, setIsShrink] = useState<boolean>(false);

  useEffect(() => {
    var timeOutHandle: number | undefined;
    if (isHit) {
      setIsShrink(true);
      timeOutHandle = setTimeout(() => {
        setIsShrink(false);
      }, 300);
      resetPaddleIsHit();
    }

    return () => {
      if (timeOutHandle) {
        clearTimeout(timeOutHandle);
      }
    };
  }, [isHit, resetPaddleIsHit]);

  return (
    <div
      className={`paddle ${isShrink ? "paddle-shrink" : ""}`}
      style={{
        backgroundColor: color,
        width: width,
        height: height,
        top: position.y,
        left: position.x,
      }}
    >
      {label}
    </div>
  );
};
