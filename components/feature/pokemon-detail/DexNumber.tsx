type Props = {
  dexNumber: string;
};

export const DexNumber = ({ dexNumber }: Props) => {
  return (
    <div className="m-auto w-56 rounded-lg dark:bg-transparent">
      <h1 className="mb-8 text-center text-5xl font-bold xl:mb-5">
        {dexNumber}
      </h1>
    </div>
  );
};
