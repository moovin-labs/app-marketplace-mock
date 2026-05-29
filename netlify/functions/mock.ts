import type { Handler } from '@netlify/functions'
import { mockRequestSchema } from './_shared/contracts'
import { dispatchAction } from './_shared/dispatcher'
import { json, options } from './_shared/http'

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return options()
  }

  if (event.httpMethod !== 'POST') {
    return json(405, {
      type: 'error',
      code: 'METHOD_NOT_ALLOWED',
      message: 'Use o metodo POST para /api/mock',
    })
  }

  let parsedBody: unknown

  try {
    parsedBody = event.body ? JSON.parse(event.body) : {}
  } catch {
    return json(400, {
      type: 'error',
      code: 'INVALID_JSON',
      message: 'Body JSON invalido',
    })
  }

  const parsedRequest = mockRequestSchema.safeParse(parsedBody)

  if (!parsedRequest.success) {
    return json(422, {
      type: 'error',
      code: 'INVALID_REQUEST',
      message: 'Payload invalido para o contrato action + payload',
      details: parsedRequest.error.flatten(),
    })
  }

  const { action, payload } = parsedRequest.data

  return dispatchAction(action, payload)
}
