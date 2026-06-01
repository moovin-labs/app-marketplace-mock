import type { CommandName, CommandResolver, ErrorEnvelope, SuccessEnvelope } from './contracts'
import {
    getAnnouncementByCode,
    getAnnouncementOperationData,
    getCategorizationData,
    getListAnnouncementsData,
    getListConnectionsData,
    getListOrdersData,
    getOrderByCode,
    getSyncControlData,
} from './data'
import { json } from './http'

function success<T>(data: T) {
  const body: SuccessEnvelope<T> = {
    type: 'success',
    data,
  }

  return json(200, body)
}

function error(message: string) {
  const body: ErrorEnvelope = {
    type: 'error',
    message,
  }

  return json(200, body)
}

function getDataString(data: Record<string, unknown>, key: string): string | null {
  const value = data[key]

  return typeof value === 'string' && value.length > 0 ? value : null
}

export const handlers: Record<CommandName, CommandResolver> = {
  listConnections: async () => success(getListConnectionsData()),

  getCategorization: async (data) => {
    const parent = getDataString(data, 'parent')

    return success(getCategorizationData(parent ?? undefined))
  },

  listAnnouncements: async () => success(getListAnnouncementsData()),

  getAnnouncement: async (data) => {
    const codeOnChannel = getDataString(data, 'codeOnChannel')

    if (!codeOnChannel) {
      return error('Command getAnnouncement requires data.codeOnChannel')
    }

    const announcement = getAnnouncementByCode(codeOnChannel)

    if (!announcement) {
      return error('Announcement not found for informed codeOnChannel')
    }

    return success(announcement)
  },

  createAnnouncement: async (data) => {
    const codeOnSource = getDataString(data, 'codeOnSource')

    return success(getAnnouncementOperationData(codeOnSource ?? undefined))
  },

  updateAnnouncement: async (data) => {
    const codeOnSource = getDataString(data, 'codeOnSource')

    return success(getAnnouncementOperationData(codeOnSource ?? undefined))
  },

  updateStock: async () => success(getSyncControlData()),

  updatePrice: async () => success(getSyncControlData()),

  listOrders: async () => success(getListOrdersData()),

  getOrder: async (data) => {
    const codeOnChannel = getDataString(data, 'codeOnChannel')

    if (!codeOnChannel) {
      return error('Command getOrder requires data.codeOnChannel')
    }

    const order = getOrderByCode(codeOnChannel)

    if (!order) {
      return error('Order not found for informed codeOnChannel')
    }

    return success(order)
  },

  updateOrder: async () => success(getSyncControlData()),
}
