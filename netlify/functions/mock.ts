import type { Handler } from '@netlify/functions'
import { marketplaceCommandRequestSchema } from './_shared/contracts'
import { dispatchCommand } from './_shared/dispatcher'
import { json, options } from './_shared/http'

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return options()
  }

  if (event.httpMethod !== 'POST') {
    return json(405, {
      type: 'error',
      message: 'Method not allowed. Use POST on /api/mock.',
    })
  }

  let parsedBody: unknown

  try {
    parsedBody = event.body ? JSON.parse(event.body) : {}
  } catch {
    return json(400, {
      type: 'error',
      message: 'Invalid JSON body.',
    })
  }

  const parsedRequest = marketplaceCommandRequestSchema.safeParse(parsedBody)

  if (!parsedRequest.success) {
    return json(200, {
      type: 'error',
      message: 'Invalid command envelope. Expected { command, connectionId, data }.',
    })
  }

  const { command, connectionId, data } = parsedRequest.data

  return dispatchCommand(command, data, connectionId)
}
