import { useEffect, useState } from "react";
import { TPosition } from "../type";

export type TObstacleProps = {
  position: TPosition;
  size: number;
  isHit: boolean;
  resetObstacleIsHit: () => void;
};

export const Obstacle = (props: TObstacleProps) => {
  const { position, size, isHit, resetObstacleIsHit } = props;
  const [isGlow, setIsGlow] = useState<boolean>(false);

  useEffect(() => {
    if (isHit) {
      setIsGlow(true);
      setTimeout(() => {
        setIsGlow(false);
      }, 300);
      resetObstacleIsHit();
    }
  }, [isHit, resetObstacleIsHit]);

  return (
    <div
      className={`obstacle ${isGlow ? "obstacle-glow" : ""}`}
      data-name="obstacle"
      style={{
        width: size,
        height: size,
        top: position.y,
        left: position.x,
      }}
    ></div>
  );
};
