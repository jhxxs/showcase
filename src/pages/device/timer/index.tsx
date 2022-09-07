import IconFont from "@/components/Iconfont"
import { getWeekdaysText, weekdaysMin } from "@/constants"
import { Theme } from "@/constants/theme"
import Messenger from "@/controller"
import { DeviceTimer, Enable, timerListAtom, Weekdays } from "@/jotai"
import { showModal } from "@/utils/common"
import { geId } from "@/utils/tool"
import { css } from "@linaria/core"
import { Button, Cell, FixedView, Popup, Switch } from "@taroify/core"
import { PickerView, PickerViewColumn, View } from "@tarojs/components"
import { useRouter } from "@tarojs/taro"
import clsx from "clsx"
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import { atomWithReset, useResetAtom } from "jotai/utils"
import { cloneDeep, isEqual, range } from "lodash"
import { useCallback, useMemo } from "react"

definePageConfig({
  navigationBarTitleText: "喝水提醒"
})

/** 添加/编辑定时弹窗是否展示 */
const openAtom = atom(false)
/** 当前修改的定时器的索引 */
const indexAtom = atom<number | undefined>(undefined)
/** 定时器弹窗类型 */
const typeAtom = atom<"edit" | "add">("add")

// const timerListSplitAtom = splitAtom(timerListAtom)

const weekdays2days = (data: Weekdays) => {
  const orderd = [data[data.length - 1], ...data.slice(0, data.length - 1)]
  const days = orderd.reduce<number[]>((list, cur, index) => {
    // 将值为1的索引收集起来
    if (cur == 1) {
      list.push(index)
    }
    return list
  }, [])

  return getWeekdaysText(days)
}

type TimerListChangeOption =
  | {
      type: "add"
      timer: DeviceTimer
    }
  | {
      type: "remove"
      index: number
    }
  | {
      type: "edit"
      index: number
      timer: DeviceTimer
    }

export default () => {
  const { deviceId = "" } = useRouter<{
    deviceId: string
  }>().params

  const setOpen = useSetAtom(openAtom)
  const setIndex = useSetAtom(indexAtom)
  const setType = useSetAtom(typeAtom)
  const resetTimer = useResetAtom(popupTimerAtom)
  const setPopupTimer = useSetAtom(popupTimerAtom)
  const timerList = useAtomValue(timerListAtom)
  const setTimerList = useSetAtom(timerListAtom)

  const app = useMemo(
    () =>
      new Messenger({
        deviceId
      }),
    [deviceId]
  )

  const handleAdd = useCallback(() => {
    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()
    resetTimer()
    setPopupTimer((s) => ({ ...s, hour, minute, enable: 1 }))
    setType("add")
    setOpen(true)
  }, [resetTimer, setOpen, setPopupTimer, setType])

  /** 统一这里来修改时间列表 */
  const handleChange = useCallback(
    (param: TimerListChangeOption) => {
      setTimerList((s) => {
        const list = cloneDeep(s)
        if (param.type === "add") {
          list.push(param.timer)
        } else if (param.type == "edit") {
          list[param.index] = param.timer
        } else if (param.type == "remove") {
          list.splice(param.index, 1)
        }

        console.log("定时列表更新：", list)

        try {
          app.setTimer(list)
        } catch (error) {
          console.log(
            "🚀 ~ file: index.tsx ~ line 106 ~ setTimerList ~ error",
            error
          )
        }
        return list
      })
    },
    [app, setTimerList]
  )

  return (
    <>
      <TimerPopup onChange={handleChange} />
      {timerList.length > 0 && (
        <View
          className={css`
            padding: 20px 32px 20px;
          `}
        >
          {timerList.map((v, index, arr) => (
            <TimerCard
              key={v.id}
              // key={v.debugLabel!}
              // timerAtom={v}
              timer={v}
              className={clsx(
                css`
                  box-shadow: 0px 4px 12px 0px rgba(165, 165, 165, 0.16);
                `,
                index < arr.length - 1
                  ? css`
                      margin-bottom: 32px;
                    `
                  : ""
              )}
              onEdit={() => setIndex(index)}
              onChange={(timer) => handleChange({ type: "edit", index, timer })}
            />
          ))}
        </View>
      )}

      {timerList.length <= 0 && (
        <View
          className={css`
            height: calc(100vh - 200px);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 112px;
            color: #b1b1b1;
          `}
        >
          <IconFont
            color="#b1b1b1"
            name="ic-heshuitixing-xianxing"
            size={112}
          />
          <View
            className={css`
              font-size: 32px;
              color: ${Theme.textSeond};
              margin-top: 32px;
            `}
          >
            暂无喝水提醒
          </View>
        </View>
      )}

      {timerList.length < 5 && (
        <FixedView placeholder position="bottom" safeArea="bottom">
          <View
            className={css`
              padding: 20px 120px 0;
              margin-bottom: 20px;
            `}
          >
            <Button
              color="primary"
              shape="round"
              block
              onClick={handleAdd}
              className={css`
                border: none !important;
                background: ${Theme.themeGreen};
              `}
            >
              添加定时
            </Button>
          </View>
        </FixedView>
      )}
    </>
  )
}

const add0 = (str: string | number) => `${str}`.padStart(2, "0")

const TimerCard: React.FC<
  StyledProps<{
    timer: DeviceTimer
    onEdit: () => void
    onChange: (data: DeviceTimer) => void
  }>
> = ({ timer, className, onEdit, onChange }) => {
  const setOpen = useSetAtom(openAtom)
  const setType = useSetAtom(typeAtom)
  const setPopupTimer = useSetAtom(popupTimerAtom)

  const handleChange = useCallback(
    (data: Partial<DeviceTimer>) => {
      onChange?.({ ...timer, ...data })
    },
    [onChange, timer]
  )

  const handleEdit = useCallback(() => {
    onEdit?.()
    setPopupTimer(cloneDeep(timer))
    setType("edit")
    setOpen(true)
  }, [onEdit, setOpen, setPopupTimer, setType, timer])

  return (
    <>
      <Cell
        align="center"
        bordered={false}
        onClick={handleEdit}
        className={clsx(
          css`
            --border-width-base: 0px;
            --switch-node-box-shadow: 0;
            --switch-background-color: #d8d8d8;
            --switch-checked-background-color: #9dccb9;
            --switch-width: 88px !important;
            --switch-height: 48px !important;
            --switch-node-size: 32px;
            --switch-node-translate-x: ${88 - 32 + 8}px;
            border-radius: 30px;
            height: 144px;
            .taroify-cell {
              &__value {
                display: none;
              }
              &__title {
                color: #222;
                font-size: 44px;
                font-weight: 500;
                line-height: 52px;
              }
              &__brief {
                margin-top: 8px;
                font-size: 28px;
                line-height: 33px;
                color: ${Theme.textSeond};
              }
            }
            .taroify-switch {
              display: flex;
              align-items: center;
              &--checked {
                .taroify-switch__node {
                  transform: translateX(${88 - 32 - 8}px);
                }
              }
              &__node {
                left: none;
                top: none;
                position: static;
                transform: translateX(8px);
              }
            }
          `,
          className
        )}
        title={`${add0(timer.hour ?? 0)}:${add0(timer.minute ?? 0)}`}
        brief={weekdays2days(timer.weekdays)}
        rightIcon={
          <Switch
            onClick={(e) => e.stopPropagation()}
            checked={timer.enable == 1}
            size={24}
            onChange={(e) => {
              handleChange({
                enable: e ? 1 : 0
              })
            }}
          />
        }
      />
    </>
  )
}

const popupTimerPreset: DeviceTimer = {
  id: geId(),
  hour: 10,
  minute: 10,
  weekdays: [0, 0, 0, 0, 0, 0, 0]
}
const popupTimerAtom = atomWithReset(popupTimerPreset)

const TimerPopup: React.FC<{
  onChange: (pararm: TimerListChangeOption) => void
}> = ({ onChange }) => {
  const [open, setOpen] = useAtom(openAtom)
  const type = useAtomValue(typeAtom)
  const index = useAtomValue(indexAtom)
  const [timer, setTimer] = useAtom(popupTimerAtom)
  const resetTimer = useResetAtom(popupTimerAtom)

  const time = useMemo(
    () => [timer.hour, timer.minute],
    [timer.hour, timer.minute]
  )

  const options = useMemo(() => {
    return [
      {
        list: range(0, 24),
        css: css`
          float: right;
        `
      },
      {
        list: range(0, 60)
      }
    ]
  }, [])

  const handleDelete = useCallback(async () => {
    const res = await showModal({
      content: "确定要删除该定时吗？"
    })

    if (res.confirm) {
      setOpen(false)
      onChange?.({
        type: "remove",
        index: index!
      })
    }
  }, [index, onChange, setOpen])

  const handleCancel = useCallback(() => {
    setOpen(false)
    resetTimer()
  }, [resetTimer, setOpen])

  const handleChange = useCallback(
    (data: Partial<DeviceTimer>) => {
      setTimer((s) => ({ ...s, ...data }))
    },
    [setTimer]
  )

  const handleSubmit = () => {
    if (type == "add") {
      onChange?.({
        type: "add",
        timer: {
          ...timer,
          id: geId()
        }
      })
    } else if (type == "edit") {
      onChange?.({
        type: "edit",
        index: index!,
        timer
      })
    }

    setOpen(false)
  }

  return (
    <>
      <Popup
        catchMove
        placement="bottom"
        rounded
        open={open}
        onClose={handleCancel}
        className={css`
          --popup-close-icon-color: ${Theme.textFirst};
          .taroify-popup {
            &__close {
              &-icon {
                font-size: 48px;
                right: 40px;
              }
            }
          }
        `}
      >
        <Popup.Close>
          <View>
            <IconFont
              name="ic-guanbi-xianxing"
              size={48}
              color={Theme.textFirst}
            />
          </View>
        </Popup.Close>
        <View
          className={css`
            height: 116px;
            position: relative;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${Theme.textFirst};
            font-size: 32px;
          `}
        >
          {type == "edit" && (
            <View
              className={css`
                position: absolute;
                left: 0;
                font-size: 48px;
                padding: 32px 40px;
              `}
              onClick={handleDelete}
            >
              <IconFont name="ic-shanchu-xianxing" size={48} color="#f56161" />
            </View>
          )}
          {type == "add" ? "添加" : "编辑"}定时
        </View>
        <View
          className={css`
            padding: 0 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            ::after {
              display: block;
              content: ":";
              font-size: 48px;
              position: absolute;
              height: 100px;
              line-height: 90px;
              color: #333;
            }
          `}
        >
          <PickerView
            value={time}
            indicatorStyle="height: 50px;"
            className={css`
              height: 420px;
              box-sizing: border-box;
              width: 100%;
              border-radius: 20px;
              overflow: hidden;
              background: #fff;
              position: relative;
            `}
            immediateChange
            indicatorClass={css`
              height: 100px;
            `}
            onChange={(e) => {
              const [hour = 0, minute = 0] = e.detail.value
              handleChange({
                hour,
                minute
              })
            }}
          >
            <>
              {options.map((c) => (
                <PickerViewColumn>
                  {c.list.map((v) => (
                    <View
                      className={clsx(
                        css`
                          font-size: 48px;
                          color: #333333;
                        `
                      )}
                    >
                      <View
                        className={clsx(
                          css`
                            height: 100%;
                            width: 200px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          `,
                          c.css
                        )}
                      >
                        {v}
                      </View>
                    </View>
                  ))}
                </PickerViewColumn>
              ))}
            </>
          </PickerView>
        </View>

        <View>
          <RepeatTimer
            weekdays={timer.weekdays}
            onChange={(e) => handleChange({ weekdays: e })}
          />
        </View>
        <View
          className={css`
            padding: 0 40px 20px;
          `}
        >
          <Button
            shape="round"
            block
            onClick={handleSubmit}
            className={css`
              border: none !important;
              box-shadow: 0px 4px 12px 0px rgba(165, 165, 165, 0.16);
            `}
          >
            确定
          </Button>
        </View>
      </Popup>
    </>
  )
}

/** 重复周期
 * @description 这里的weekdays要按照 【周一周日】计算
 */
const RepeatTimer: React.FC<
  {
    onChange?: (e: DeviceTimer["weekdays"]) => void
  } & Pick<DeviceTimer, "weekdays">
> = ({ weekdays, onChange }) => {
  const activeClass = css`
    color: ${Theme.textFirst};
    /* background: #fffcec; */
    /* border: 2px solid ${Theme.themeColor}; */
    box-shadow: 0px 4px 32px 2px rgba(0, 0, 0, 0.04);
    background: ${Theme.themeGreen};
    color: #fff;
  `

  // 将【周日到周六】转成【周一到周六】
  const weekdaysMin2 = useMemo(
    () => [...weekdaysMin.slice(1), weekdaysMin[0]],
    []
  )

  const popupTimer = useAtomValue(popupTimerAtom)
  const days = popupTimer.weekdays

  const presets = useMemo(() => {
    const list: ({
      title: string
    } & Pick<DeviceTimer, "weekdays">)[] = [
      {
        title: "每天",
        weekdays: [1, 1, 1, 1, 1, 1, 1]
      },
      {
        title: "工作日",
        weekdays: [1, 1, 1, 1, 1, 0, 0]
      },
      {
        title: "仅一次",
        weekdays: [0, 0, 0, 0, 0, 0, 0]
      }
    ]
    return list
  }, [])

  const handleChange = useCallback(
    (e: typeof weekdays) => {
      onChange?.(e)
    },
    [onChange]
  )

  return (
    <View
      className={css`
        padding: 20px 40px 48px;
      `}
    >
      <View
        className={css`
          padding: 20px 0;
          line-height: 33px;
          color: ${Theme.textFirst};
          font-size: 28px;
        `}
      >
        重复周期
      </View>
      <View
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 32px 0;
        `}
      >
        {weekdaysMin2.map((v, index, arr) => (
          <View
            className={clsx(
              css`
                width: 64px;
                height: 64px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                border-radius: 50%;
              `,
              days[index] == 1
                ? activeClass
                : css`
                    /* border: 2px solid #fff; */
                    color: #999;
                    /* color: ${Theme.textSeond}; */
                  `,
              index == arr.length - 1
                ? css`
                    order: 1;
                  `
                : css`
                    order: 2;
                  `
            )}
            onClick={() => {
              const value = +!days[index] as Enable
              const temp = [...days] as typeof weekdays
              temp[index] = value
              handleChange(temp)
            }}
          >
            {v}
          </View>
        ))}
      </View>

      <View
        className={css`
          display: flex;
          padding: 16px 0;
          margin-left: -16px;
          margin-right: -16px;
        `}
      >
        {presets.map((v) => (
          <View
            className={css`
              padding-left: 16px;
              padding-right: 16px;
              width: 33.33%;
            `}
          >
            <View
              className={clsx(
                css`
                  width: 100%;
                  height: 64px;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 28px;
                `,
                isEqual(v.weekdays, days)
                  ? activeClass
                  : css`
                      /* border: 2px solid #e6e6e6;
                      color: ${Theme.textSeond}; */
                      border: 2px solid #f5f5f5;
                      background: #f5f5f5;
                      color: #999;
                    `
              )}
              onClick={() => handleChange(v.weekdays)}
            >
              {v.title}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
