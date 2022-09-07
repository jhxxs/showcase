import dayjs from "dayjs"
import { test, expect } from "vitest"
import { sum } from "./sum"

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3)
})

test("dayjs", () => {
  const hour = dayjs("2022-06-21 0").hour()
  console.log("🚀 ~ file: index.test.ts ~ line 13 ~ test ~ hour", hour)
})
