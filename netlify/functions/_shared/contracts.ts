import { z } from 'zod'

export const commandEnum = z.enum([
  'listConnections',
  'getCategorization',
  'createAnnouncement',
  'getAnnouncement',
  'listAnnouncements',
  'updateAnnouncement',
  'updateStock',
  'updatePrice',
  'getOrder',
  'listOrders',
  'updateOrder',
])

export const marketplaceCommandRequestSchema = z.object({
  command: commandEnum,
  connectionId: z.string().min(1).optional(),
  data: z.record(z.unknown()).default({}),
})

export type MarketplaceCommandRequest = z.infer<typeof marketplaceCommandRequestSchema>
export type CommandName = z.infer<typeof commandEnum>

export type MockFunctionResponse = {
  statusCode: number
  body: string
  headers?: Record<string, string>
}

export type CommandResolver = (
  data: Record<string, unknown>,
  connectionId: string | undefined,
) => Promise<MockFunctionResponse>

export type SuccessEnvelope<T> = {
  type: 'success'
  data: T
}

export type ErrorEnvelope = {
  type: 'error'
  message: string
}
