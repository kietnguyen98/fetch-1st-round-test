import Matter from "matter-js";
import { generateUUID } from "./helper";
import { BALL_SIZE, BALL_START_Y, SCREEN_WIDTH } from "../constants";
import { TBallData } from "../type";

export function generateBall(Bodies: typeof Matter.Bodies): TBallData {
  const id = generateUUID();
  const position = {
    x:
      (SCREEN_WIDTH - BALL_SIZE) / 2 +
      (Math.random() > 0.5
        ? Math.random() * BALL_SIZE
        : Math.random() * (BALL_SIZE * -1)),
    y: BALL_START_Y,
  };
  const size = BALL_SIZE;
  const physicsBody = Bodies.circle(
    position.x + size / 2,
    position.y + size / 2,
    size / 2,
    { id: id }
  );
  physicsBody.restitution = 0.6;
  physicsBody.friction = 0.05;

  return {
    id: id.toString(),
    position,
    size,
    physicsBody,
  };
}
