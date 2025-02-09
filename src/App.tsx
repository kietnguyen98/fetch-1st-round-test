import Matter from "matter-js";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Ball } from "./components/Ball";
import { Obstacle } from "./components/Obstacle";
import { Paddle } from "./components/Paddle";
import { RateStack } from "./components/RateStack";
import { BALL_SPAWN_ELAPSE, GENERATE_BALL_NUMB } from "./constants";
import { TBallData, TObstacleData, TPaddleData } from "./type";
import { generateBall } from "./utils/generateBall";
import { generateObstacles } from "./utils/generateObstacles";
import { generatePaddles } from "./utils/generatePaddles";
import { generateUUID } from "./utils/helper";

function App() {
  const ballSpawnTimer = useRef<number>(0);
  const ballSpawnCounter = useRef<number>(0);
  const ballSpawnElapse = useRef<number>(BALL_SPAWN_ELAPSE);
  const [balls, setBalls] = useState<Array<TBallData>>([]);
  const ballsRef = useRef<Array<TBallData>>([]);
  const [obstacles, setObstacles] = useState<Array<TObstacleData>>([]);
  const obstaclesRef = useRef<Array<TObstacleData>>([]);
  const [paddles, setPaddles] = useState<Array<TPaddleData>>([]);
  const paddlesRef = useRef<Array<TPaddleData>>([]);
  const [hitPaddles, setHitPaddles] = useState<Array<TPaddleData>>([]);

  // module aliases
  const Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    // Render = Matter.Render,
    Events = Matter.Events;

  // create an engine
  const engine = Engine.create({ gravity: { x: 0, y: 4, scale: 0.0008 } });

  // render for debug
  // var render = Render.create({
  //   element: document.body,
  //   engine: engine,
  //   options: {
  //     width: 1600,
  //     height: 1600,
  //     showAxes: true,
  //     showPerformance: true,
  //   },
  // });

  // setup bounding box
  const topLeftBBBody = Bodies.rectangle(355, -40, 10, 100, {
    isStatic: true,
  });
  Composite.add(engine.world, topLeftBBBody);

  const leftBBBody = Bodies.rectangle(110, 500, 10, 1100, {
    isStatic: true,
    angle: Math.PI / 6 - 0.06,
  });
  Composite.add(engine.world, leftBBBody);

  const topRightBBBody = Bodies.rectangle(665, -40, 10, 100, {
    isStatic: true,
  });
  Composite.add(engine.world, topRightBBBody);

  const rightBBBody = Bodies.rectangle(910, 500, 10, 1100, {
    isStatic: true,
    angle: -Math.PI / 6 + 0.06,
  });
  Composite.add(engine.world, rightBBBody);

  // run matter engine whenever App finish mounting
  useEffect(() => {
    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    // run the renderer for debug
    // Render.run(render);

    // setup collision detection
    Events.on(engine, "collisionStart", function (event) {
      // check if obstacle collided with ball
      // if yes, trigger obstacle state
      const collidedBodyIds = event.pairs
        .map((p) => [p.bodyA.id, p.bodyB.id])
        .flat();
      obstaclesRef.current = obstaclesRef.current.map((obstacle) =>
        collidedBodyIds.includes(obstacle.physicsBody.id)
          ? { ...obstacle, isHit: true }
          : obstacle
      );
      setObstacles(obstaclesRef.current);

      // check if paddle collide with ball
      const ballBodyIds = ballsRef.current.map((ball) => ball.physicsBody.id);
      const paddleBodyIds = paddlesRef.current.map(
        (paddle) => paddle.physicsBody.id
      );

      event.pairs.forEach((pair) => {
        const objectA = pair.bodyA;
        const objectB = pair.bodyB;

        // 2 cases:
        // case 1: object A -> Ball && object B -> Paddle
        // case 2: object A -> Paddle && object B -> Ball
        if (
          ballBodyIds.includes(objectA.id) &&
          paddleBodyIds.includes(objectB.id)
        ) {
          // remove the ball
          ballsRef.current = ballsRef.current.filter((ball) => {
            if (ball.physicsBody.id === objectA.id) {
              Composite.remove(engine.world, ball.physicsBody);
              return false;
            }
            return true;
          });
          setBalls(ballsRef.current);

          // trigger paddle state
          const hitPaddle = paddlesRef.current.find(
            (paddle) => paddle.physicsBody.id === objectB.id
          ) as TPaddleData;

          paddlesRef.current = paddlesRef.current.map((paddle) =>
            paddle.physicsBody.id === objectB.id
              ? { ...paddle, isHit: true }
              : paddle
          );
          setPaddles(paddlesRef.current);

          // update rate stack
          setHitPaddles((prev) => [
            { ...hitPaddle, id: generateUUID().toString() },
            ...prev,
          ]);
        } else if (
          ballBodyIds.includes(objectB.id) &&
          paddleBodyIds.includes(objectA.id)
        ) {
          // remove the ball
          ballsRef.current = ballsRef.current.filter((ball) => {
            if (ball.physicsBody.id === objectB.id) {
              Composite.remove(engine.world, ball.physicsBody);
              return false;
            }
            return true;
          });
          setBalls(ballsRef.current);

          // trigger paddle state
          const hitPaddle = paddlesRef.current.find(
            (paddle) => paddle.physicsBody.id === objectA.id
          ) as TPaddleData;

          paddlesRef.current = paddlesRef.current.map((paddle) =>
            paddle.physicsBody.id === objectA.id
              ? { ...paddle, isHit: true }
              : paddle
          );
          setPaddles(paddlesRef.current);

          // update rate stack
          setHitPaddles((prev) => [
            { ...hitPaddle, id: generateUUID().toString() },
            ...prev,
          ]);
        }
      });
    });

    Events.on(engine, "beforeUpdate", function (event) {
      // ball spawn
      if (
        (event.timestamp - ballSpawnTimer.current) / 1000 >
        ballSpawnElapse.current
      ) {
        if (ballSpawnCounter.current < GENERATE_BALL_NUMB) {
          const newBall = generateBall(Bodies);
          Composite.add(engine.world, newBall.physicsBody);
          ballsRef.current = [...ballsRef.current, newBall];
          setBalls(ballsRef.current);
          ballSpawnCounter.current = ballSpawnCounter.current + 1;

          // speed up
          ballSpawnElapse.current =
            ballSpawnElapse.current -
            0.2 * (ballSpawnCounter.current / GENERATE_BALL_NUMB) ** 2;
        }

        ballSpawnTimer.current = event.timestamp;
      }
    });

    // setup obstacles & paddles
    if (obstaclesRef.current.length === 0) {
      const obstacles = generateObstacles(Bodies);
      obstaclesRef.current = obstacles;
      setObstacles(obstacles);
      obstacles.forEach((obstacle) =>
        Composite.add(engine.world, obstacle.physicsBody)
      );
    }

    if (paddlesRef.current.length === 0) {
      const paddles = generatePaddles(Bodies);
      paddlesRef.current = paddles;
      setPaddles(paddles);
      paddles.forEach((paddle) =>
        Composite.add(engine.world, paddle.physicsBody)
      );
    }

    return () => {
      Runner.stop(runner);
      Composite.clear(engine.world, false, true);
      Events.off(engine, "collisionStart");
      Events.off(engine, "beforeUpdate");
    };
  }, []);

  return (
    <div id="app" className="app">
      <div className="game">
        {balls.map((ball) => (
          <Ball
            key={ball.id}
            position={ball.position}
            size={ball.size}
            physicsBody={ball.physicsBody}
          />
        ))}
        {obstacles.map((obstacle) => {
          return (
            <Obstacle
              key={obstacle.id}
              position={obstacle.position}
              size={obstacle.size}
              isHit={obstacle.isHit}
              resetObstacleIsHit={() => {
                obstaclesRef.current = obstaclesRef.current.map(
                  (obstacleData) =>
                    obstacleData.id === obstacle.id
                      ? { ...obstacleData, isHit: false }
                      : obstacleData
                );
                setObstacles(obstaclesRef.current);
              }}
            />
          );
        })}
        {paddles.map((paddle) => {
          return (
            <Paddle
              key={paddle.id}
              id={paddle.id}
              position={paddle.position}
              width={paddle.width}
              height={paddle.height}
              rate={paddle.rate}
              label={paddle.label}
              color={paddle.color}
              isHit={paddle.isHit}
              resetPaddleIsHit={() => {
                paddlesRef.current = paddlesRef.current.map((paddleData) =>
                  paddleData.id === paddle.id
                    ? { ...paddleData, isHit: false }
                    : paddleData
                );
                setPaddles(paddlesRef.current);
              }}
            />
          );
        })}
        <RateStack hitPaddles={hitPaddles} />
      </div>
    </div>
  );
}

export default App;
