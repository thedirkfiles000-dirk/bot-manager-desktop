export interface ScanSource {
  id: string
  name: string
  filename: string
}

export type ScanStatus = 'visible' | 'shadowbanned' | 'violation' | 'error'

export interface ScanOverlayData {
  status: ScanStatus
  totalChatCnt: number
  totalUserCnt: number
  recentChatCnt: number
  recentUserCnt: number
  followedCnt: number
}

export interface PolyBuzzScanResults {
  scanDate: string
  visible: ScanBotEntry[]
  renamed: ScanBotEntry[]
  banned: ScanBotEntry[]
  errors: Array<{ cid: string; name: string }>
}

export interface ScanBotEntry {
  cid: string
  name: string
  totalChatCnt: number
  totalUserCnt: number
  recentChatCnt: number
  recentUserCnt: number
  followedCnt: number
  isInViolation: boolean
  isShadowBanned: boolean
  isRenamed: boolean
  isVisible: boolean
  [key: string]: unknown
}
