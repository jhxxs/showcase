type Unwrap<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T

type GetResponse<T extends (...args: any[]) => any> = Unwrap<
  ReturnType<T>
>["data"]

/** 单个房子 */
type ThingTypeRoom = {
  room_id: number
  /** 房间名称 */
  room_name: string
  sort: number
  /** 自填充设备列表 */
  device_list?: ThingTypeDevice[]
}

type ThingShadow = import("@/service/server/msg").ControllersReqNewThingShadow

/** 单个设备 */
interface ThingTypeDevice extends ThingShadow {
  /** 蓝牙地址 */
  bd_addr?: string
  /** 设备名称 */
  device_name?: string
  /** 设备类型(1:直连设备,2:网关,3:节点设备,4:Mesh) */
  device_type?: 1 | 2
  /*  是否支持群组 */
  is_support_group?: 1 | 2
  /** 房子标签 */
  label?: string
  /** 设备mac地址 */
  mac?: string
  /** MeshJson */
  mesh_json?: string
  /** 平台 */
  platform?: string
  /** 设备图标 */
  product_icon?: string
  /** 所属房间id */
  room_id?: number
  /** 序号 */
  sort?: number
  /** 房间id */
  roomId?: number
  /** 房间名称 */
  roomName?: string
  /** 是否是虚拟设备 */
  is_virtual_device?: boolean
  /**
   * 设备连接状态
   * - 0 未发现
   * - 1 已连接
   * - 2 可连接
   */
  __connect_status: 0 | 1 | 2
  /** 鉴权token */
  token?: string
}

type WCSwiperProps = {
  contentList: {
    title: string
    content: JSX.Element
    value?: string
  }[]
  current: number
  onChange: (current: number) => void
  disableSwiper?: boolean
  disable?: boolean
  adaptiveParentElementHeight?: boolean
} & Pick<import("@tarojs/components").ViewProps, "className">

/** 获取函数参数 */
type GetArg<T> = T extends (arg: infer P) => any ? P : never

/** 获得形如 `'a' | 'b' | string` 的类型 */
type StrExpand<T extends string, P = string> = T | Omit<P, T>

/** 获得形如 `0 | 1 | 2 | number` 的类型 */
type NumExpand<T extends number> = Omit<number, T>
