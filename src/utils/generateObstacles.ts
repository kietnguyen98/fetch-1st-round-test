import Matter from "matter-js";
import { generateUUID } from "./helper";
import { OBSTACLES_POS, OBSTACLES_SIZE } from "../constants";
import { TObstacleData } from "../type";

export function generateObstacles(
  Bodies: typeof Matter.Bodies
): Array<TObstacleData> {
  return OBSTACLES_POS.flat().map((position) => {
    const id = generateUUID();
    const physicsBody = Bodies.circle(
      position.x + OBSTACLES_SIZE / 2,
      position.y + OBSTACLES_SIZE / 2,
      OBSTACLES_SIZE / 2,
      { isStatic: true, id: id }
    );

    physicsBody.friction = 0.05;

    return {
      id: id.toString(),
      position: position,
      size: OBSTACLES_SIZE,
      physicsBody: physicsBody,
      isHit: false,
    };
  });
}
