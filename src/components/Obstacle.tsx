import { useEffect, useState } from "react";
import { TPosition } from "../type";

export type TObstacleProps = {
  position: TPosition;
  size: number;
  isHit: boolean;
  resetObstacleIsHit: () => void;
};

export const Obstacle = (props: TObstacleProps) => {
  const [isGlow, setIsGlow] = useState<boolean>(false);

  useEffect(() => {
    if (props.isHit) {
      setIsGlow(true);
      setTimeout(() => {
        setIsGlow(false);
      }, 300);
      props.resetObstacleIsHit();
    }
  }, [props.isHit]);

  return (
    <div
      className={`obstacle ${isGlow ? "obstacle-glow" : ""}`}
      data-name="obstacle"
      style={{
        width: props.size,
        height: props.size,
        top: props.position.y,
        left: props.position.x,
      }}
    ></div>
  );
};
