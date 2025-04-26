<!-- omit in toc -->
# Gundam API Documentation

The API can be reached via: `http://localhost:3000/api`

<!-- omit in toc -->
## Table of contents

- [Series Endpoints](#series-endpoints)
  - [Get All Series](#get-all-series)
  - [Get Series by ID](#get-series-by-id)
  - [Create Series](#create-series)
  - [Update Series](#update-series)
  - [Delete Series](#delete-series)
- [Pilots Endpoints](#pilots-endpoints)
  - [Get All Pilots](#get-all-pilots)
  - [Get Pilot by ID](#get-pilot-by-id)
  - [Get Pilots by Series ID](#get-pilots-by-series-id)
  - [Create Pilot](#create-pilot)
  - [Update Pilot](#update-pilot)
  - [Delete Pilot](#delete-pilot)
- [Mobile Suits Endpoints](#mobile-suits-endpoints)
  - [Get All Mobile Suits](#get-all-mobile-suits)
  - [Get Mobile Suit by ID](#get-mobile-suit-by-id)
  - [Get Mobile Suits by Series ID](#get-mobile-suits-by-series-id)
  - [Create Mobile Suit](#create-mobile-suit)
  - [Update Mobile Suit](#update-mobile-suit)
  - [Delete Mobile Suit](#delete-mobile-suit)
- [Health Check](#health-check)
- [Response Codes](#response-codes)
- [Data Types](#data-types)
  - [Series](#series)
  - [Pilot](#pilot)
  - [Mobile Suit](#mobile-suit)

## Series Endpoints

### Get All Series

```bash
curl http://localhost:3000/api/series
```

### Get Series by ID

```bash
curl http://localhost:3000/api/series/1
```

### Create Series

```bash
curl -X POST http://localhost:3000/api/series \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mobile Suit Gundam",
    "yearStart": 1979,
    "yearEnd": 1980,
    "description": "The original Gundam series"
  }'
```

### Update Series

```bash
curl -X PUT http://localhost:3000/api/series/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mobile Suit Gundam",
    "yearStart": 1979,
    "yearEnd": 1980,
    "description": "The original Gundam series"
  }'
```

### Delete Series

```bash
curl -X DELETE http://localhost:3000/api/series/1
```

## Pilots Endpoints

### Get All Pilots

```bash
curl http://localhost:3000/api/pilots
```

### Get Pilot by ID

```bash
curl http://localhost:3000/api/pilots/1
```

### Get Pilots by Series ID

```bash
curl http://localhost:3000/api/pilots/series/1
```

### Create Pilot

```bash
curl -X POST http://localhost:3000/api/pilots \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Amuro Ray",
    "codename": "White Base",
    "affiliation": "Earth Federation",
    "seriesId": 1
  }'
```

### Update Pilot

```bash
curl -X PUT http://localhost:3000/api/pilots/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Amuro Ray",
    "codename": "White Base",
    "affiliation": "Earth Federation",
    "seriesId": 1
  }'
```

### Delete Pilot

```bash
curl -X DELETE http://localhost:3000/api/pilots/1
```

## Mobile Suits Endpoints

### Get All Mobile Suits

```bash
curl http://localhost:3000/api/mobile-suits
```

### Get Mobile Suit by ID

```bash
curl http://localhost:3000/api/mobile-suits/1
```

### Get Mobile Suits by Series ID

```bash
curl http://localhost:3000/api/mobile-suits/series/1
```

### Create Mobile Suit

```bash
curl -X POST http://localhost:3000/api/mobile-suits \
  -H "Content-Type: application/json" \
  -d '{
    "name": "RX-78-2 Gundam",
    "modelNumber": "RX-78-2",
    "manufacturer": "Earth Federation",
    "height": 18.0,
    "weight": 43.4,
    "armorMaterial": "Luna Titanium",
    "powerPlant": "Minovsky Ultracompact Fusion Reactor",
    "seriesId": 1
  }'
```

### Update Mobile Suit

```bash
curl -X PUT http://localhost:3000/api/mobile-suits/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "RX-78-2 Gundam",
    "modelNumber": "RX-78-2",
    "manufacturer": "Earth Federation",
    "height": 18.0,
    "weight": 43.4,
    "armorMaterial": "Luna Titanium",
    "powerPlant": "Minovsky Ultracompact Fusion Reactor",
    "seriesId": 1
  }'
```

### Delete Mobile Suit

```bash
curl -X DELETE http://localhost:3000/api/mobile-suits/1
```

## Health Check

```bash
curl http://localhost:3000/health
```

## Response Codes

- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Data Types

### Series

```typescript
{
  id: number
  name: string
  yearStart?: number
  yearEnd?: number
  description?: string
  createdAt: Date
  updatedAt: Date
}
```

### Pilot

```typescript
{
  id: number
  name: string
  codename?: string
  affiliation?: string
  seriesId?: number
  createdAt: Date
  updatedAt: Date
}
```

### Mobile Suit

```typescript
{
  id: number
  name: string
  modelNumber?: string
  manufacturer?: string
  height?: number
  weight?: number
  armorMaterial?: string
  powerPlant?: string
  seriesId?: number
  createdAt: Date
  updatedAt: Date
}
```
