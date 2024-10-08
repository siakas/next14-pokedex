import { DataCard } from "@/components/feature/pokemon-detail/DataCard";
import { Heading } from "@/components/feature/pokemon-detail/Heading";
import { usePokemonDetailStore } from "@/store/pokemonDetailStore";
import Image from "next/image";

export const OtherLang = () => {
  const { species } = usePokemonDetailStore((state) => ({
    species: state.species,
  }));

  // 取得する言語のインデックス
  const index = [
    { id: "aRiu1GGi6Aoe", index: 8 },
    { id: "hTMPE6ntTofO", index: 5 },
    { id: "3muzEmi4dpD5", index: 4 },
    { id: "-_RS8ho736Fs", index: 2 },
  ];

  if (!species) return null;

  return (
    <div className="w-full lg:w-2/6">
      <Heading>言語別の名称</Heading>
      <DataCard>
        <ul className="my-1 flex flex-col gap-2 text-sm">
          {index.map((i) => (
            <li key={i.id} className="flex items-center gap-1">
              <Image
                src={`https://img.icons8.com/?size=256&id=${i.id}&format=png`}
                alt=""
                width={20}
                height={20}
              />
              {species.names[i.index].name}
            </li>
          ))}
        </ul>
      </DataCard>
    </div>
  );
};
