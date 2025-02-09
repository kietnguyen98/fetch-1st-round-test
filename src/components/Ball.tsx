import { useEffect, useState, memo } from "react";
import { TPosition } from "../type";
import Matter from "matter-js";

export type TBall = {
  position: TPosition;
  size: number;
  physicsBody: Matter.Body;
};

export const Ball = (props: TBall) => {
  const [position, setPosition] = useState<TPosition>(props.position);

  useEffect(() => {
    const loop = () => {
      setPosition({
        x: props.physicsBody.position.x - props.size / 2,
        y: props.physicsBody.position.y - props.size / 2,
      });
      requestAnimationFrame(loop);
    };

    loop();
  }, []);

  return <BallMesh posX={position.x} posY={position.y} size={props.size} />;
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
