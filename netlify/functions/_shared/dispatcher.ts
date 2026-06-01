import type { CommandName } from './contracts'
import { handlers } from './handlers'
import { json } from './http'

export async function dispatchCommand(
  command: CommandName,
  data: Record<string, unknown>,
  connectionId: string | null | undefined,
) {
  const handler = handlers[command]

  if (!handler) {
    return json(200, {
      type: 'error',
      message: `Unsupported command: ${command}`,
    })
  }

  return handler(data, connectionId)
}
