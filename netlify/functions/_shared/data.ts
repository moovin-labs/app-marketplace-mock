export const commandCatalog = [
  'listConnections',
  'getCategorization',
  'listAnnouncements',
  'getAnnouncement',
  'createAnnouncement',
  'updateAnnouncement',
  'updateStock',
  'updatePrice',
  'listOrders',
  'getOrder',
  'updateOrder',
] as const

export type CommandName = (typeof commandCatalog)[number]

export const mockConnections = [
  {
    id: 'conn-ml-01',
    name: 'Mercado Livre Principal',
    status: 'ACTIVE',
  },
  {
    id: 'conn-shp-01',
    name: 'Shopee BR',
    status: 'ACTIVE',
  },
]

export const mockAnnouncements = [
  {
    codeOnChannel: 'MLB-1000',
    title: 'Notebook Pro 16',
    active: true,
    stock: 12,
    price: {
      list: 8999,
      sale: 8499,
    },
  },
  {
    codeOnChannel: 'MLB-1001',
    title: 'Mouse Gamer RGB',
    active: true,
    stock: 150,
    price: {
      list: 299,
      sale: 249,
    },
  },
]

export const mockOrders = [
  {
    codeOnChannel: 'ORD-9001',
    status: 'APPROVED',
    customer: {
      name: 'Ana Souza',
      document: '12345678900',
    },
    total: 8748,
  },
  {
    codeOnChannel: 'ORD-9002',
    status: 'PENDING',
    customer: {
      name: 'Lucas Dias',
      document: '10987654321',
    },
    total: 249,
  },
]
