/**
 * ポケモンの捕獲率を計算する
 * @param hp ポケモンのHP
 * @param rate ポケモンの捕獲率
 * @returns 捕獲成功率
 */
export const calculateCaptureProb = (hp: number, rate: number): number => {
  const result = (1 + (hp * 3 - hp * 2) * rate * 1 * 1) / (hp * 3) / 256
  return Math.round(result * 1000) / 1000 // 小数点第3位まで丸める
}

/**
 * 捕獲成功率に応じたプログレスバーの色を取得する
 * @param prob 捕獲成功率
 * @returns 捕獲成功率に応じたプログレスバーの色
 */
export const getColorByProbability = (
  prob: number,
): 'danger' | 'warning' | 'success' => {
  if (prob < 0.1) return 'danger'
  if (prob < 0.2) return 'warning'
  return 'success'
}
