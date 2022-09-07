declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        TARO_ENV: "miniprogram" | "h5" | "weapp" | "Unknown"
        NODE_ENV: "development" | "production"
        // * - `test` - 测试
        /**
         * 接口服务环境
         * - `pro` - 正式
         * - `dev` - 开发
         */
        API_ENV: "prod" | "dev"
      }
    }
  }
}
