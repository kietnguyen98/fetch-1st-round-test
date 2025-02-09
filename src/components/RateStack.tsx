import { useEffect, useState } from "react";
import { TPaddleData } from "../type";

type TRateCardProps = {
  id: number;
  data: TPaddleData;
};

const RateCard = ({ data, id }: TRateCardProps) => {
  const [slide, setSlide] = useState<boolean>(true);

  useEffect(() => {
    var timeOutHandle: number | undefined;
    setSlide(true);
    timeOutHandle = setTimeout(() => {
      setSlide(false);
    }, 300);

    return () => {
      if (timeOutHandle) {
        clearTimeout(timeOutHandle);
      }
    };
  }, [id]);

  return (
    <div
      className={`rate-card ${slide ? "rate-card-slide-down" : ""}`}
      style={{
        backgroundColor: data.color,
      }}
    >
      {data.label}
    </div>
  );
};

type TRateStackProps = {
  hitPaddles: Array<TPaddleData>;
};

export const RateStack = ({ hitPaddles }: TRateStackProps) => {
  return (
    <div className="rate-stack">
      {hitPaddles.map((paddleData, index) => (
        <RateCard key={paddleData.id} data={paddleData} id={index} />
      ))}
    </div>
  );
};
