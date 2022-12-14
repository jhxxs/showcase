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
              console.info("ð£ï¸ ååè®¾ç½®èçä½åèçMTU", res)

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
    console.log("ð£ï¸ mtuå·²æ´æ°", res.mtu)

    setCurrentMTU(res.mtu as unknown as number)
  }, [])

  const getMTU = useCallback((deviceId: string) => {
    return new Promise((resolve) => {
      getBLEMTU({
        deviceId,
        writeType: "write"
      })
        .then((res) => {
          console.log("ð£ï¸ è·åèçä½åèçMTU", res)
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
    /** æå¤§ä¼ è¾åå (Maximum Transmission Unit, MTU) */
    MTU,
    /** æ´æ°è®¾å¤id */
    // setDeviceId,
    /** MTUåå */
    askMTU,
    /** æ¥è¯¢MTU */
    getMTU
  }
}
