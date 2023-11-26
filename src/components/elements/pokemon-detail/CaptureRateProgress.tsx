import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  CircularProgress,
} from '@nextui-org/react'
import { round } from 'lodash-es'

interface Props {
  captureRate: number
  pokemonHP: number
}

const CaptureRateProgress = ({ captureRate, pokemonHP }: Props) => {
  const calculateCaptureProb = (hp: number, rate: number): number =>
    round(((1 + (hp * 3 - hp * 2) * rate * 1 * 1) / (hp * 3) / 256) * 100, 1)

  const captureProb = calculateCaptureProb(pokemonHP, captureRate)
  const progressBarColor =
    captureProb < 20 ? (captureProb < 10 ? 'danger' : 'warning') : 'success'

  return (
    <Card>
      <CardBody className="items-center justify-center pb-0">
        <CircularProgress
          className="mb-2"
          classNames={{
            svg: 'w-28 h-28 drop-shadow-md',
            track: 'stroke-white/10',
            value: 'text-2xl font-semibold text-white',
          }}
          color={progressBarColor}
          formatOptions={{ style: 'unit', unit: 'percent' }}
          showValueLabel={true}
          size="sm"
          strokeWidth={4}
          value={captureProb}
        />
      </CardBody>
      <CardFooter className="items-center justify-center pt-0">
        <Chip>捕獲係数：{captureRate}</Chip>
      </CardFooter>
    </Card>
  )
}

export default CaptureRateProgress
