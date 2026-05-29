import type { ErrorEnvelope, MockScenario } from './contracts'
import { json, sleep } from './http'

function parseScenario(value: unknown): MockScenario {
  const allowed: Array<MockScenario> = [
    'success',
    'validation_error',
    'unauthorized',
    'not_found',
    'timeout',
    'internal_error',
  ]

  if (typeof value !== 'string') {
    return 'success'
  }

  return allowed.includes(value as MockScenario) ? (value as MockScenario) : 'success'
}

function parseDelay(value: unknown): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0
  }

  return Math.max(0, Math.min(30000, Math.floor(value)))
}

export function getScenario(payload: Record<string, unknown>): MockScenario {
  return parseScenario(payload.scenario)
}

export function getDelay(payload: Record<string, unknown>): number {
  return parseDelay(payload.delayMs)
}

export async function maybeDelay(payload: Record<string, unknown>): Promise<void> {
  const delayMs = getDelay(payload)

  if (delayMs > 0) {
    await sleep(delayMs)
  }
}

export async function handleCommonScenario(
  payload: Record<string, unknown>,
): Promise<ReturnType<typeof json> | null> {
  const scenario = getScenario(payload)

  if (scenario === 'success') {
    return null
  }

  if (scenario === 'timeout') {
    await sleep(10000)

    const body: ErrorEnvelope = {
      type: 'error',
      code: 'TIMEOUT',
      message: 'Tempo limite excedido na simulacao do mock',
    }

    return json(504, body)
  }

  if (scenario === 'validation_error') {
    const body: ErrorEnvelope = {
      type: 'error',
      code: 'VALIDATION_ERROR',
      message: 'Falha de validacao na entrada',
      details: {
        required: ['action', 'payload'],
      },
    }

    return json(422, body)
  }

  if (scenario === 'unauthorized') {
    const body: ErrorEnvelope = {
      type: 'error',
      code: 'UNAUTHORIZED',
      message: 'Nao autorizado para executar a acao',
    }

    return json(401, body)
  }

  if (scenario === 'not_found') {
    const body: ErrorEnvelope = {
      type: 'error',
      code: 'NOT_FOUND',
      message: 'Recurso nao encontrado para a acao informada',
    }

    return json(404, body)
  }

  const body: ErrorEnvelope = {
    type: 'error',
    code: 'INTERNAL_ERROR',
    message: 'Erro interno simulado no mock',
  }

  return json(500, body)
}
