import { TPosition } from "./type";

// GENERAL CONFIG
export const FPS = 60;

// SCREEN CONFIG
export const SCREEN_HEIGHT = 1024;
export const SCREEN_WIDTH = 1024;

// OBSTACLE BLOCKS CONFIG
export const OBSTACLES_BLOCK_START_Y = 0;
export const OBSTACLES_BLOCK_LEVEL = 8;
export const OBSTACLES_SIZE = 30;
export const OBSTACLES_VERTICAL_DISTANCE = 100;
export const OBSTACLES_HORIZONTAL_DISTANCE = 100;

// level 1 = 3 obstacles, level 2 = 4 obstacles, level 3 = 5 obstacles
// => level n = 3 + (n-1) obstacles
export const OBSTACLES_POS = Array.from(
  { length: OBSTACLES_BLOCK_LEVEL },
  (_, i) => i + 1
).map((level) => {
  const obstacleNumb = 3 + (level - 1);
  const levelY =
    OBSTACLES_BLOCK_START_Y +
    OBSTACLES_VERTICAL_DISTANCE * (level - 1) +
    OBSTACLES_SIZE * level;
  const firstObstacleX =
    (SCREEN_WIDTH -
      (obstacleNumb * OBSTACLES_SIZE +
        (obstacleNumb - 1) * OBSTACLES_HORIZONTAL_DISTANCE)) /
    2;
  return Array.from({ length: obstacleNumb }, (_, i) => i + 1).map(
    (obstacleIndex) => {
      const obstaclePos: TPosition = {
        x:
          firstObstacleX +
          (obstacleIndex - 1) *
            (OBSTACLES_SIZE + OBSTACLES_HORIZONTAL_DISTANCE),
        y: levelY,
      };

      return obstaclePos;
    }
  );
});

// BALL CONFIG
export const GENERATE_BALL_NUMB = 30;
export const BALL_SPAWN_ELAPSE = 1;
export const BALL_SIZE = 50;
export const BALL_START_Y = -100;

// PADDLE CONFIG
export const PADDLE_WIDTH = 115;
export const PADDLE_HEIGHT = 60;
export const PADDLE_START_Y = 1000;
export const PADDLE_HORIZONTAL_DISTANCE = 15;
export const PADDLE_RATE = {
  "0.2x": {
    rate: 0.2,
    label: "0.2x",
    color: "#ffff33",
  },
  "0.3x": {
    rate: 0.3,
    label: "0.3x",
    color: "#ffa64d",
  },
  "1.5x": {
    rate: 1.5,
    label: "1.5x",
    color: "#ff751a",
  },
  "4x": {
    rate: 4,
    label: "4x",
    color: "#ff471a",
  },
  "29x": {
    rate: 29,
    label: "29x",
    color: "#e60000",
  },
};

export const PADDLE_MAP = [
  PADDLE_RATE["29x"],
  PADDLE_RATE["4x"],
  PADDLE_RATE["1.5x"],
  PADDLE_RATE["0.3x"],
  PADDLE_RATE["0.2x"],
  PADDLE_RATE["0.3x"],
  PADDLE_RATE["1.5x"],
  PADDLE_RATE["4x"],
  PADDLE_RATE["29x"],
];

export const PADDLE_POS = PADDLE_MAP.map((_, index) => {
  const firstPaddleX =
    (SCREEN_WIDTH -
      (PADDLE_MAP.length * PADDLE_WIDTH +
        (PADDLE_MAP.length - 1) * PADDLE_HORIZONTAL_DISTANCE)) /
    2;

  const paddlePos: TPosition = {
    x: firstPaddleX + index * (PADDLE_WIDTH + PADDLE_HORIZONTAL_DISTANCE),
    y: PADDLE_START_Y,
  };

  return paddlePos;
});
