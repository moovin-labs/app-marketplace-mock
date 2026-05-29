import { z } from 'zod'

export const mockRequestSchema = z.object({
  action: z.string().min(1),
  payload: z.record(z.unknown()).default({}),
})

export type MockRequest = z.infer<typeof mockRequestSchema>

export type MockScenario =
  | 'success'
  | 'validation_error'
  | 'unauthorized'
  | 'not_found'
  | 'timeout'
  | 'internal_error'

export type MockFunctionResponse = {
  statusCode: number
  body: string
  headers?: Record<string, string>
}

export type ActionResolver = (payload: Record<string, unknown>) => Promise<MockFunctionResponse>

export type SuccessEnvelope<T> = {
  type: 'success'
  data: T
}

export type ErrorEnvelope = {
  type: 'error'
  message: string
  code?: string
  details?: unknown
}
