import type { ActionResolver, SuccessEnvelope } from './contracts'
import { mockAnnouncements, mockConnections, mockOrders } from './data'
import { json } from './http'
import { handleCommonScenario, maybeDelay } from './scenario'

function success<T>(data: T) {
  const body: SuccessEnvelope<T> = {
    type: 'success',
    data,
  }

  return json(200, body)
}

function syncControl(status: string, message: string) {
  return {
    syncControl: {
      status,
      message,
      updatedAt: new Date().toISOString(),
    },
  }
}

async function withScenario(
  payload: Record<string, unknown>,
  onSuccess: () => ReturnType<typeof json>,
) {
  await maybeDelay(payload)

  const scenarioResponse = await handleCommonScenario(payload)

  if (scenarioResponse) {
    return scenarioResponse
  }

  return onSuccess()
}

export const handlers: Record<string, ActionResolver> = {
  listConnections: async (payload) =>
    withScenario(payload, () => {
      return success({
        items: mockConnections,
        total: mockConnections.length,
      })
    }),

  getCategorization: async (payload) =>
    withScenario(payload, () => {
      return success({
        categories: [
          {
            id: 'cat-1',
            name: 'Eletronicos',
            children: [
              { id: 'cat-1-1', name: 'Computadores' },
              { id: 'cat-1-2', name: 'Perifericos' },
            ],
          },
        ],
      })
    }),

  listAnnouncements: async (payload) =>
    withScenario(payload, () => {
      return success({
        items: mockAnnouncements,
        total: mockAnnouncements.length,
      })
    }),

  getAnnouncement: async (payload) =>
    withScenario(payload, () => {
      const codeOnChannel = payload.codeOnChannel
      const found =
        typeof codeOnChannel === 'string'
          ? mockAnnouncements.find((item) => item.codeOnChannel === codeOnChannel)
          : mockAnnouncements[0]

      return success(found ?? mockAnnouncements[0])
    }),

  createAnnouncement: async (payload) =>
    withScenario(payload, () => {
      return success({
        codeOnChannel: 'MLB-NEW-2001',
        ...syncControl('SUCCESS', 'Anuncio criado com sucesso no canal'),
      })
    }),

  updateAnnouncement: async (payload) =>
    withScenario(payload, () => {
      return success(syncControl('SUCCESS', 'Anuncio atualizado com sucesso'))
    }),

  updateStock: async (payload) =>
    withScenario(payload, () => {
      return success(syncControl('SUCCESS', 'Estoque atualizado com sucesso'))
    }),

  updatePrice: async (payload) =>
    withScenario(payload, () => {
      return success(syncControl('SUCCESS', 'Preco atualizado com sucesso'))
    }),

  listOrders: async (payload) =>
    withScenario(payload, () => {
      return success({
        items: mockOrders,
        total: mockOrders.length,
      })
    }),

  getOrder: async (payload) =>
    withScenario(payload, () => {
      const codeOnChannel = payload.codeOnChannel
      const found =
        typeof codeOnChannel === 'string'
          ? mockOrders.find((item) => item.codeOnChannel === codeOnChannel)
          : mockOrders[0]

      return success(found ?? mockOrders[0])
    }),

  updateOrder: async (payload) =>
    withScenario(payload, () => {
      return success(syncControl('SUCCESS', 'Pedido atualizado com sucesso'))
    }),
}
