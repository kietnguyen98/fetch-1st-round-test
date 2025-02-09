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
  const [isShrink, setIsShrink] = useState<boolean>(false);

  useEffect(() => {
    if (props.isHit) {
      setIsShrink(true);
      setTimeout(() => {
        setIsShrink(false);
      }, 300);
      props.resetPaddleIsHit();
    }
  }, [props.isHit]);

  return (
    <div
      className={`paddle ${isShrink ? "paddle-shrink" : ""}`}
      style={{
        backgroundColor: props.color,
        width: props.width,
        height: props.height,
        top: props.position.y,
        left: props.position.x,
      }}
    >
      {props.label}
    </div>
  );
};
