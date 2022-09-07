import { DeviceTimer } from "@/jotai"
import { str2abArray, stringChunk } from "@/utils/tool"
import { writeBLECharacteristicValue } from "@tarojs/taro"
import dayjs from "dayjs"
import md5 from "md5"

export enum CMD {
  "version" = 0x01,
  "syncClock" = 0x02,
  "BLEStatus" = 0x03,
  "syncSavedRecord" = 0x04,
  "power" = 0x05,
  "timer" = 0x06,
  "measure" = 0x08
}

type Option = Pick<GetArg<typeof writeBLECharacteristicValue>, "deviceId">

class Messenger {
  /** 命令字 */
  private readonly cmd = CMD

  constructor(option: Option) {
    this.option = { ...this.option, ...option }
  }

  private option: Option = {
    deviceId: ""
  }

  /** 补0 */
  #add0(str: string | number, length = 2) {
    return `${str}`.padStart(length, "0")
  }

  /** str转成hex */
  private str2hex(n: number, length = 2) {
    return this.#add0(n.toString(16), length).toUpperCase()
  }

  /** 发送指令 */
  private async send(
    /** 命令字 */
    cmd: CMD,
    /** 数据长度 */
    length: number,
    /** 数据 */
    data: string[]
  ) {
    const sum =
      "00" +
      (cmd + length + data.reduce((s, i) => s + parseInt(i, 16), 0)).toString(
        16
      )

    const checkSum = parseInt(sum.slice(-2), 16)

    const arr = [
      this.cmd["frameHeadSend"],
      cmd,
      length,
      ...data.map((v) => parseInt(v, 16)),
      checkSum
    ]

    return bleSend(arr, this.option.deviceId)
  }

  getVersion(type) {
    return this.send(this.cmd.version, 1, [type ? "00" : "01"])
  }

  syncClock() {
    const date = dayjs()
      .format("YY,M,D,H,m,s,d")
      .split(",")
      .map((v) => (+v).toString(16))
    return this.send(this.cmd.syncClock, date.length, date)
  }

  setTimer(data: DeviceTimer[]) {
    const values = [
      data.length,
      ...data
        .map((v) => [
          +(v.enable ?? 0),
          v.hour,
          v.minute,
          // bit位从低位到高位依次为星期一到星期日，所以需要倒转一下
          parseInt("0" + [...v.weekdays].reverse().join(""), 2)
        ])
        .flat()
    ]

    return this.send(
      this.cmd.timer,
      values.length,
      values.map((v) => v.toString(16).padStart(2, "0"))
    )
  }

  saveACK(type: 0 | 1 | 2 = 0) {
    return this.send(this.cmd.syncSavedRecord, 1, [`0${type}`])
  }

  /**
   * @deprecated
   */
  unbind() {
    return this.send(this.cmd.unbind, 1, ["00"])
  }
}

export default Messenger

/**
 * 向设备端传输数据
 * @param data 要发送的数据
 * @description 遵循`TLV`格式发送数据，当需要分包时，前面需空出三个字节分配给：指令类型、分包索引（从1开始）、数据长度；最后接的才是要发生的数据值
 */
export const bleSend = async (data: number[] | string, deviceId: string) =>
  new Promise<void>(async (resolve, reject) => {
    {
      let arrData: number[] = []
      if (typeof data === "string") {
        if (data.match(/\s/g)) {
          arrData = data.split(" ").map((v) => parseInt(v, 16))
        } else {
          arrData = str2abArray(data)
        }
      } else if (Array.isArray(data)) {
        arrData = data
      }

      // 加密后分包发送: 每个包最多20字节
      /**
       * 总发包的数
       * | 分包 | 分包总个数 | 内容长度 | 内容 |
       * |----------|----------|----------|----------|
       * |   1 字节  |1 字节|1 字节|最多17字节|
       */
      let buffer: ArrayBuffer

      if (Array.isArray(data)) {
        buffer = new Uint8Array(data).buffer
      } else {
        /**
         * 每一个包的数据转成buff之后发送给设备
         * 前三位留给TLV (Type, Length, Value)
         */
        buffer = new ArrayBuffer(arrData.length + 2)
        const dataView = new DataView(buffer)
        dataView.setUint8(0, 0)
        dataView.setUint8(1, arrData.length)
        arrData.forEach((v, index) => dataView.setUint8(index + 2, v))
      }

      const msgStr = [...new Uint8Array(buffer)]
        .map((v) => v.toString(16).padStart(2, "0").toUpperCase())
        .join("-")

      await writeBLECharacteristicValue({
        deviceId,
        serviceId: BLE_SERVICE_UUID,
        characteristicId: WRITE_CHARACTERISTIC_UUID,
        value: buffer,
        success: (_res) => {
          resolve()
        },
        fail: (error) => {
          console.warn("❌发送错误", error)
          reject(error)
        }
      }).catch(() => {})
      // }
    }
  })

/** 服务`UUID` */
export const BLE_SERVICE_UUID = ""
/** 特性`UUIID` - `APP`向设备写 */
export const WRITE_CHARACTERISTIC_UUID = ""
/** 特性`UUID` - 设备通知APP */
export const READ_CHARACTERISTIC_UUID = ""
