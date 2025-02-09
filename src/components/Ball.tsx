import Matter from "matter-js";
import { memo, useEffect, useState } from "react";
import { TPosition } from "../type";

export type TBall = {
  position: TPosition;
  size: number;
  physicsBody: Matter.Body;
};

export const Ball = (props: TBall) => {
  const { position: defaultPosition, size, physicsBody } = props;
  const [position, setPosition] = useState<TPosition>(defaultPosition);

  useEffect(() => {
    const loop = () => {
      setPosition({
        x: physicsBody.position.x - size / 2,
        y: physicsBody.position.y - size / 2,
      });
      requestAnimationFrame(loop);
    };

    loop();
  }, [physicsBody, size]);

  return <BallMesh posX={position.x} posY={position.y} size={size} />;
};

const BallMesh = memo(function BallMesh({
  size,
  posX,
  posY,
}: {
  posX: number;
  posY: number;
  size: number;
}) {
  return (
    <div
      className="ball"
      data-name="ball"
      style={{
        width: size,
        height: size,
        top: posY,
        left: posX,
      }}
    ></div>
  );
});
