const nowIso = '2026-05-29T10:00:00.000Z'

const syncControl = {
  status: 'SUCCESS',
  message: 'Command executed successfully',
}

const connectionItems = [
  {
    id: 'conn-ml-01',
    name: 'Mercado Livre Principal',
  },
  {
    id: 'conn-shp-01',
    name: 'Shopee BR',
  },
]

const announcementFacets = {
  announcement: {
    settings: [
      {
        id: 'condition',
        name: 'Condition',
        required: true as const,
        options: [
          { key: 'new', value: 'New' },
          { key: 'used', value: 'Used' },
        ],
      },
    ],
    attributes: [
      {
        id: 'brand',
        name: 'Brand',
        required: true as const,
        options: [
          { key: 'brand-a', value: 'Brand A' },
          { key: 'brand-b', value: 'Brand B' },
        ],
      },
    ],
  },
  variation: {
    attributes: [
      {
        id: 'color',
        name: 'Color',
        required: true as const,
        options: [
          { key: 'black', value: 'Black' },
          { key: 'white', value: 'White' },
        ],
      },
    ],
  },
}

const announcementItems = [
  {
    codeOnChannel: 'MLB-1000',
    title: 'Notebook Pro 16',
    description: 'Notebook high performance',
    channelCategory: {
      id: 'cat-1',
      label: 'Eletronicos',
      parent: {},
    },
    channelSettings: [
      {
        id: 'condition',
        name: 'condition',
        label: 'Condition',
        value: 'new',
      },
    ],
    channelAttributes: [
      {
        id: 'brand',
        name: 'brand',
        label: 'Brand',
        value: 'Brand A',
      },
    ],
    images: [{ url: 'https://mock.cdn/images/notebook-1.jpg', position: 1 }],
    variations: [
      {
        codeOnChannel: 'MLB-1000-BLK',
        ean: '789000000001',
        images: [{ url: 'https://mock.cdn/images/notebook-1-black.jpg', position: 1 }],
        channelAttributes: [
          {
            id: 'color',
            name: 'color',
            label: 'Color',
            value: 'Black',
          },
        ],
        shipping: {
          width: 40,
          height: 8,
          length: 28,
          weight: 2.3,
        },
      },
    ],
  },
]

const orderItems = [
  {
    codeOnChannel: 'ORD-9001',
    status: 'APPROVED',
    customer: {
      name: 'Ana Souza',
      email: 'ana.souza@example.com',
      document: '12345678900',
      phone: '+5511999999999',
      type: 'INDIVIDUAL',
    },
    shipping: {
      method: {
        type: 'STANDARD',
        name: 'Correios PAC',
        carrierName: 'Correios',
        deliveryTime: 5,
        code: 'PAC',
      },
      address: {
        zipCode: '01310100',
        street: 'Av Paulista',
        number: '1000',
        complement: 'Conj 101',
        district: 'Bela Vista',
        city: 'Sao Paulo',
        state: 'SP',
      },
      tracking: {
        postDate: nowIso,
        deliveryDate: nowIso,
        code: 'TRACK-9001',
        link: 'https://carrier.example.com/TRACK-9001',
      },
    },
    items: [
      {
        product: {
          codeOnChannel: 'MLB-1000',
        },
        variation: {
          codeOnChannel: 'MLB-1000-BLK',
          gtin: '789000000001',
        },
        description: 'Notebook Pro 16 - Black',
        image: 'https://mock.cdn/images/notebook-1-black.jpg',
        quantity: 1,
        price: 8499,
      },
    ],
    billing: {
      payment: {
        type: 'CREDIT_CARD',
        installments: 10,
      },
      address: {
        zipCode: '01310100',
        street: 'Av Paulista',
        number: '1000',
        complement: 'Conj 101',
        district: 'Bela Vista',
        city: 'Sao Paulo',
        state: 'SP',
      },
      amounts: {
        subtotal: 8499,
        shipping: 49,
        discount: 0,
        total: 8548,
      },
      invoice: {
        key: 'NFE-KEY-9001',
        number: '9001',
        serial: '1',
        issuedOn: nowIso,
        xml: '<xml />',
        link: 'https://mock.cdn/invoice/9001.xml',
      },
    },
    approvedAt: nowIso,
    canceledAt: nowIso,
    updatedAt: nowIso,
    createdAt: nowIso,
  },
]

export function getListConnectionsData() {
  return {
    items: connectionItems,
    total: connectionItems.length,
  }
}

export function getCategorizationData() {
  return {
    items: [
      { id: 'cat-1', name: 'Eletronicos' },
      { id: 'cat-2', name: 'Informatica' },
    ],
    facets: announcementFacets,
  }
}

export function getListAnnouncementsData() {
  return {
    items: announcementItems,
    total: announcementItems.length,
  }
}

export function getAnnouncementByCode(codeOnChannel: string) {
  return announcementItems.find((item) => item.codeOnChannel === codeOnChannel)
}

export function getAnnouncementOperationData() {
  return {
    codeOnChannel: 'MLB-NEW-2001',
    syncControl,
    variations: [
      {
        codeOnChannel: 'MLB-NEW-2001-BLK',
        syncControl,
        stock: {
          syncControl,
        },
        price: {
          syncControl,
        },
      },
    ],
  }
}

export function getSyncControlData() {
  return {
    syncControl,
  }
}

export function getListOrdersData() {
  return {
    items: orderItems,
    total: orderItems.length,
  }
}

export function getOrderByCode(codeOnChannel: string) {
  return orderItems.find((item) => item.codeOnChannel === codeOnChannel)
}
