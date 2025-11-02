import { logger } from '../logger/Logger'

// const globalSetup = async (config: FullConfig) => {
const globalSetup = async () => {
  logger.setup('🔧 Running Global Setup...')
  return async () => {}
}

export default globalSetup
