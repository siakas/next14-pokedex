import { PageNavigation } from '@/components/layout/PageNavigation'
import { ToggleTheme } from '@/components/layout/ToggleTheme'

export const Controller = () => {
  return (
    <div className="my-6 flex justify-end gap-3">
      {/* ページ切り替え */}
      <PageNavigation />

      {/* ダークモード切替 */}
      <ToggleTheme />
    </div>
  )
}
