# app-marketplace-mock

API mock unica para simular respostas de integracao do hub-marketplace.

## Endpoint

- URL local: `http://localhost:8888/api/mock`
- Metodo: `POST`
- Contrato: `action + payload`

Exemplo de request:

```json
{
  "action": "listOrders",
  "payload": {
    "scenario": "success",
    "delayMs": 0
  }
}
```

## Cenarios suportados

Defina em `payload.scenario`:

- `success`
- `validation_error`
- `unauthorized`
- `not_found`
- `timeout`
- `internal_error`

`payload.delayMs` permite adicionar latencia artificial em milissegundos (0 a 30000).

## Acoes suportadas v1

- `listConnections`
- `getCategorization`
- `listAnnouncements`
- `getAnnouncement`
- `createAnnouncement`
- `updateAnnouncement`
- `updateStock`
- `updatePrice`
- `listOrders`
- `getOrder`
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
    "action": "updateStock",
    "payload": {
      "scenario": "success",
      "codeOnChannel": "MLB-1000"
    }
  }'
```
