import { round } from 'lodash-es'

type Props = {
  captureRate: number
  pokemonHP: number
}

export const CaptureRateProgress = ({ captureRate, pokemonHP }: Props) => {
  // プログレスバーの色パターン
  const progressBarColor = {
    danger: {
      start: '#ef4444',
      end: '#dc2626',
    },
    warning: {
      start: '#fbbf24',
      end: '#f59e0b',
    },
    success: {
      start: '#6366f1',
      end: '#3b82f6',
    },
  }

  // ポケモンの体力と捕獲率から捕獲成功率を算出
  const calculateCaptureProb = (hp: number, rate: number): number =>
    round((1 + (hp * 3 - hp * 2) * rate * 1 * 1) / (hp * 3) / 256, 3)

  // 捕獲成功率
  const captureProb = calculateCaptureProb(pokemonHP, captureRate)

  // 捕獲成功率に応じたプログレスバーの色を取得
  const color =
    captureProb < 0.2 ? (captureProb < 0.1 ? 'danger' : 'warning') : 'success'

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
            strokeDasharray="251.2"
            strokeDashoffset={251.2 * (1 - captureProb)}
          />
          <defs>
            <linearGradient
              id="progress-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={progressBarColor[color].start} />
              <stop offset="100%" stopColor={progressBarColor[color].end} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute left-0 top-0 grid size-full place-items-center text-3xl font-bold">
          <span>
            {round(captureProb * 100, 1)}
            <span className="text-xl">%</span>
          </span>
        </div>
      </div>
    </div>
  )
}
