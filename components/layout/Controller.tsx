import { BackToList } from "@/components/layout/BackToList";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { SelectLimit } from "@/components/layout/SelectLimit";
import { ToggleTheme } from "@/components/layout/ToggleTheme";

type Props = {
  /** 一覧表示画面であるかどうか */
  isShowList?: boolean;
};

export const Controller = ({ isShowList = true }: Props) => {
  return (
    <div className="my-6 flex justify-end gap-3">
      {/* ページ切り替え／一覧へ戻る */}
      {isShowList ? <PageNavigation /> : <BackToList />}

      {/* 表示件数切り替え */}
      {isShowList && <SelectLimit />}

      {/* ダークモード切替 */}
      <ToggleTheme />
    </div>
  );
};
