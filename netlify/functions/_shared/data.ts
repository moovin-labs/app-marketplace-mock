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

type CategoryNode = {
  id: string
  name: string
  children?: Array<CategoryNode>
}

const categoryTree: Array<CategoryNode> = [
  {
    id: '100',
    name: 'Informatica',
    children: [
      {
        id: '110',
        name: 'Notebooks e Acessorios',
        children: [
          { id: '111', name: 'Notebooks' },
          { id: '112', name: 'Carregadores e Fontes' },
        ],
      },
      {
        id: '120',
        name: 'Componentes para PC',
        children: [
          { id: '121', name: 'Placas de Video' },
          { id: '122', name: 'Processadores' },
        ],
      },
      {
        id: '130',
        name: 'Perifericos de PC',
        children: [
          { id: '131', name: 'Mouses e Teclados' },
          { id: '132', name: 'Monitores' },
        ],
      },
    ],
  },
  {
    id: '200',
    name: 'Celulares e Telefones',
    children: [
      {
        id: '210',
        name: 'Smartphones',
        children: [
          { id: '211', name: 'Android' },
          { id: '212', name: 'iPhone' },
        ],
      },
      {
        id: '220',
        name: 'Acessorios para Celulares',
        children: [
          { id: '221', name: 'Capas e Peliculas' },
          { id: '222', name: 'Cabos e Carregadores' },
        ],
      },
      {
        id: '230',
        name: 'Smartwatches e Acessorios',
        children: [
          { id: '231', name: 'Smartwatches' },
          { id: '232', name: 'Pulseiras para Smartwatch' },
        ],
      },
    ],
  },
  {
    id: '300',
    name: 'Eletrodomesticos',
    children: [
      {
        id: '310',
        name: 'Refrigeracao',
        children: [
          { id: '311', name: 'Geladeiras' },
          { id: '312', name: 'Freezers' },
        ],
      },
      {
        id: '320',
        name: 'Lavanderia',
        children: [
          { id: '321', name: 'Maquinas de Lavar' },
          { id: '322', name: 'Secadoras de Roupas' },
        ],
      },
      {
        id: '330',
        name: 'Pequenos Eletrodomesticos',
        children: [
          { id: '331', name: 'Liquidificadores' },
          { id: '332', name: 'Fritadeiras sem Oleo (Air Fryers)' },
        ],
      },
    ],
  },
  {
    id: '400',
    name: 'Moda',
    children: [
      {
        id: '410',
        name: 'Roupas Femininas',
        children: [
          { id: '411', name: 'Vestidos' },
          { id: '412', name: 'Blusas e Camisetas' },
        ],
      },
      {
        id: '420',
        name: 'Roupas Masculinas',
        children: [
          { id: '421', name: 'Camisetas' },
          { id: '422', name: 'Calcas' },
        ],
      },
      {
        id: '430',
        name: 'Calcados',
        children: [
          { id: '431', name: 'Tenis' },
          { id: '432', name: 'Sandalias' },
        ],
      },
    ],
  },
  {
    id: '500',
    name: 'Esportes e Fitness',
    children: [
      {
        id: '510',
        name: 'Ciclismo',
        children: [
          { id: '511', name: 'Bicicletas' },
          { id: '512', name: 'Acessorios e Pecas' },
        ],
      },
      {
        id: '520',
        name: 'Musculacao e Fitness',
        children: [
          { id: '521', name: 'Halteres e Pesos' },
          { id: '522', name: 'Esteiras Ergometricas' },
        ],
      },
      {
        id: '530',
        name: 'Futebol',
        children: [
          { id: '531', name: 'Bolas de Futebol' },
          { id: '532', name: 'Chuteiras' },
        ],
      },
    ],
  },
]

function findCategoryNodeById(nodes: Array<CategoryNode>, targetId: string): CategoryNode | null {
  for (const node of nodes) {
    if (node.id === targetId) {
      return node
    }

    if (node.children) {
      const found = findCategoryNodeById(node.children, targetId)

      if (found) {
        return found
      }
    }
  }

  return null
}

function mapItems(nodes: Array<CategoryNode>) {
  return nodes.map((node) => ({
    id: node.id,
    name: node.name,
  }))
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

export function getCategorizationData(parent?: string) {
  if (!parent) {
    return {
      items: mapItems(categoryTree),
    }
  }

  const node = findCategoryNodeById(categoryTree, parent)

  if (!node) {
    return {
      items: [],
    }
  }

  if (node.children && node.children.length > 0) {
    return {
      items: mapItems(node.children),
    }
  }

  return {
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
