import clsx from 'clsx'

type SpinnerProps = {
  color?: string
}

const Spinner = ({ color = 'border-blue-500' }: SpinnerProps) => {
  return (
    <div className="my-16 flex justify-center">
      <div
        className={clsx(
          'h-14 w-14 animate-spin rounded-full border-8 border-t-transparent',
          color,
        )}
      ></div>
    </div>
  )
}

export default Spinner
