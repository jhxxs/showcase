import {
  getSystemInfoSync,
  offBLEMTUChange,
  onBLEMTUChange,
  setBLEMTU,
  getBLEMTU
} from "@tarojs/taro"
import { useCallback, useEffect, useMemo, useState } from "react"

type MTURes = {
  deviceId?: string
  mtu: string | number
}

export default function (max = 128) {
  const defaultMTU = 20
  const [currentMTU, setCurrentMTU] = useState(defaultMTU)
  // const [deviceId, setDeviceId] = useState("")

  const { platform } = getSystemInfoSync()

  const askMTU = useCallback(
    (deviceId: string) => {
      return new Promise<number>((resolve) => {
        if (platform === "android") {
          setBLEMTU({
            mtu: max,
            deviceId
          })
            .then((res) => {
              console.info("🗣️ 协商设置蓝牙低功耗的MTU", res)

              const mtu = (res.mtu || defaultMTU) as unknown as number
              setCurrentMTU(mtu)
              resolve(mtu)
            })
            .catch(() => {
              setCurrentMTU(defaultMTU)
              resolve(defaultMTU)
            })
        } else {
          resolve(defaultMTU)
        }
      })
    },
    [max, platform]
  )

  const updateMTU = useCallback((res: MTURes) => {
    console.log("🗣️ mtu已更新", res.mtu)

    setCurrentMTU(res.mtu as unknown as number)
  }, [])

  const getMTU = useCallback((deviceId: string) => {
    return new Promise((resolve) => {
      getBLEMTU({
        deviceId,
        writeType: "write"
      })
        .then((res) => {
          console.log("🗣️ 获取蓝牙低功耗的MTU", res)
          const mtu = (res.mtu || defaultMTU) as unknown as number
          setCurrentMTU(mtu)
          resolve(mtu)
        })
        .catch(() => {
          setCurrentMTU(defaultMTU)
          resolve(defaultMTU)
        })
    })
  }, [])

  const MTU = useMemo(() => currentMTU - 3, [currentMTU])

  onBLEMTUChange(updateMTU)

  useEffect(() => {
    return () => {
      offBLEMTUChange(updateMTU)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (deviceId) {
  //     getBLEMTU({
  //       deviceId,
  //       writeType: "write"
  //     }).then(updateMTU)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [deviceId])

  return {
    /** 最大传输单元 (Maximum Transmission Unit, MTU) */
    MTU,
    /** 更新设备id */
    // setDeviceId,
    /** MTU协商 */
    askMTU,
    /** 查询MTU */
    getMTU
  }
}
