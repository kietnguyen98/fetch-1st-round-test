import Matter from "matter-js";
import { generateUUID } from "./helper";
import {
  PADDLE_HEIGHT,
  PADDLE_MAP,
  PADDLE_POS,
  PADDLE_WIDTH,
} from "../constants";
import { TPaddleData } from "../type";

export function generatePaddles(
  Bodies: typeof Matter.Bodies
): Array<TPaddleData> {
  return PADDLE_POS.map((position, index) => {
    const id = generateUUID();
    const width = PADDLE_WIDTH;
    const height = PADDLE_HEIGHT;
    const rate = PADDLE_MAP[index].rate;
    const label = PADDLE_MAP[index].label;
    const color = PADDLE_MAP[index].color;
    const physicsBody = Bodies.rectangle(
      position.x + width / 2,
      position.y + height / 2,
      width,
      height,
      {
        isStatic: true,
        id: id,
      }
    );

    physicsBody.restitution = 0.5;
    physicsBody.friction = 0;

    return {
      id: id.toString(),
      position,
      width,
      height,
      color,
      rate,
      label,
      physicsBody,
      isHit: false,
    };
  });
}
