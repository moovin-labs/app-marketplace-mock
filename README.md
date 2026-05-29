# app-marketplace-mock

API mock unica para simular respostas de integracao Hub/App Marketplace.

## Endpoint

- URL local: `http://localhost:8888/api/mock`
- Metodo: `POST`
- Contrato: `command + connectionId + data`

Exemplo de request:

```json
{
  "command": "listOrders",
  "connectionId": "conn-ml-01",
  "data": {
    "filters": {}
  }
}
```

## Envelope de resposta

Sucesso:

```json
{
  "type": "success",
  "data": {}
}
```

Erro:

```json
{
  "type": "error",
  "message": "string"
}
```

## Commands suportados

- `listConnections`
- `getCategorization`
- `createAnnouncement`
- `getAnnouncement`
- `listAnnouncements`
- `updateAnnouncement`
- `updateStock`
- `updatePrice`
- `getOrder`
- `listOrders`
- `updateOrder`

## Rodando local

```bash
npm install
npm run dev
```

## Teste rapido

```bash
curl -X POST http://localhost:8888/api/mock \
  -H 'Content-Type: application/json' \
  -d '{
    "command": "updateStock",
    "connectionId": "conn-ml-01",
    "data": {
      "codeOnChannel": "MLB-1000",
      "stock": {
        "quantity": 10,
        "crossDocking": 0
      }
    }
  }'
```
