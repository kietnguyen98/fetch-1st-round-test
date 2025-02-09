export type TPosition = {
  x: number;
  y: number;
};

export type TBallData = {
  id: string;
  position: { x: number; y: number };
  size: number;
  physicsBody: Matter.Body;
};

export type TObstacleData = {
  id: string;
  position: { x: number; y: number };
  size: number;
  physicsBody: Matter.Body;
  isHit: boolean;
};

export type TPaddleData = {
  id: string;
  position: { x: number; y: number };
  width: number;
  height: number;
  color: string;
  rate: number;
  label: string;
  physicsBody: Matter.Body;
  isHit: boolean;
};
