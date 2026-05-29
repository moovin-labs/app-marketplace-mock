import { json } from './http'
import { handlers } from './handlers'

export async function dispatchAction(action: string, payload: Record<string, unknown>) {
  const handler = handlers[action]

  if (!handler) {
    return json(400, {
      type: 'error',
      code: 'UNSUPPORTED_ACTION',
      message: `Action nao suportada: ${action}`,
      availableActions: Object.keys(handlers),
    })
  }

  return handler(payload)
}
