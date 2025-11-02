import { logger } from '../logger/Logger'

// const globalTeardown = async (config: FullConfig) => {
const globalTeardown = async () => {
  logger.teardown('🧹 Cleaning up test session...')
}

export default globalTeardown
