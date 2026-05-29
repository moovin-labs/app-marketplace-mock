import type { MockFunctionResponse } from './contracts'

const defaultHeaders: Record<string, string> = {
  'content-type': 'application/json; charset=utf-8',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST,OPTIONS',
  'access-control-allow-headers': 'content-type',
}

export function json(statusCode: number, body: unknown): MockFunctionResponse {
  return {
    statusCode,
    headers: defaultHeaders,
    body: JSON.stringify(body),
  }
}

export function options(): MockFunctionResponse {
  return {
    statusCode: 204,
    headers: defaultHeaders,
    body: '',
  }
}

export async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
