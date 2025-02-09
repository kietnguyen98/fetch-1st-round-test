import { useEffect, useState } from "react";
import { TPaddleData } from "../type";

type TRateCardProps = {
  id: number;
  data: TPaddleData;
};

const RateCard = ({ data, id }: TRateCardProps) => {
  const [slide, setSlide] = useState<boolean>(true);

  useEffect(() => {
    setSlide(true);
    const timeOutHandle = setTimeout(() => {
      setSlide(false);
      clearTimeout(timeOutHandle);
    }, 300);
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
