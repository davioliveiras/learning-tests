import { defineConfig, mergeConfig } from 'vitest/config'
import config from './vitest.config.js'

export default mergeConfig(config, defineConfig({
  test: {
    include: ['**/*.e2e.test.ts'],
    environmentMatchGlobs: [['src/**', 'prisma']]
  },
}))