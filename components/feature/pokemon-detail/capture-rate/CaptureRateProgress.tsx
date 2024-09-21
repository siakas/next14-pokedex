import {
  CIRCLE_CIRCUMFERENCE,
  PROGRESS_BAR_COLORS,
} from "@/components/feature/pokemon-detail/capture-rate/consts";
import {
  calculateCaptureProb,
  getColorByProbability,
} from "@/components/feature/pokemon-detail/capture-rate/utils";

type Props = {
  captureRate: number;
  pokemonHP: number;
};

export const CaptureRateProgress = ({ captureRate, pokemonHP }: Props) => {
  // 捕獲成功率の計算
  const captureProb = calculateCaptureProb(pokemonHP, captureRate);

  // 捕獲成功率に応じたプログレスバーの色の取得
  const color = getColorByProbability(captureProb);

  return (
    <div className="flex flex-col-reverse items-center gap-1">
      <h3 className="relative mt-auto box-border inline-flex h-7 max-w-fit items-center justify-between whitespace-nowrap rounded-full bg-gray-700 px-1 text-sm text-white">
        <span className="flex-1 px-2 font-bold text-inherit">
          捕獲係数：{captureRate}
        </span>
      </h3>
      <div className="relative size-[163px]">
        <svg
          className="absolute left-0 top-0 size-full -rotate-90"
          viewBox="0 0 100 100"
          role="img"
          aria-label={`捕獲成功率: ${Math.round(captureProb * 100)}%`}
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#343337"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="url(#progress-gradient)"
            strokeWidth="6"
            strokeDasharray={CIRCLE_CIRCUMFERENCE}
            strokeDashoffset={CIRCLE_CIRCUMFERENCE * (1 - captureProb)}
          />
          <defs>
            <linearGradient
              id="progress-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={PROGRESS_BAR_COLORS[color].start} />
              <stop offset="100%" stopColor={PROGRESS_BAR_COLORS[color].end} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute left-0 top-0 grid size-full place-items-center text-3xl font-bold">
          <span>
            {(captureProb * 100).toFixed(1)}
            <span className="text-xl">%</span>
          </span>
        </div>
      </div>
    </div>
  );
};
