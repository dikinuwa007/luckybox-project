# Product API Documentation

## Endpoints :

List of available endpoints:

- `GET /provinces`
- `GET /:idProvince/cities`
- `POST /cost`
- `POST /generate-midtrans-token`
- `GET /transactional`
- `GET /testimonial`
- `POST /testimonial`
  &nbsp;

## 1. GET /provinces

Request:

- body:

```json
{}
```

_Response (200 - OK)_

```json
[
	{
		"province_id": "1",
		"province": "Bali"
	},
  ...
]
```

&nbsp;

## 2. GET /:idProvince/cities

Request:

- params:

```json
{
  "idProvince": "integer (required)"
}
```

- body:

```json
{}
```

_Response (200 - OK)_

```json
{
[
	{
		"city_id": "31",
		"province_id": "11",
		"province": "Jawa Timur",
		"type": "Kabupaten",
		"city_name": "Bangkalan",
		"postal_code": "69118"
	},
  ...
]
}
```

&nbsp;

## 3. POST /cost

Description:

- Get all product from database

Request:

- body:

```json
{
  "origin": "501",
  "destination": "114",
  "weight": 1,
  "courier": "jne"
}
```

_Response (201 - Created)_

```json
[
  {
    "code": "jne",
    "name": "Jalur Nugraha Ekakurir (JNE)",
    "costs": [
      {
        "service": "OKE",
        "description": "Ongkos Kirim Ekonomis",
        "cost": [
          {
            "value": 27000,
            "etd": "4-5",
            "note": ""
          }
        ]
      },
      {
        "service": "REG",
        "description": "Layanan Reguler",
        "cost": [
          {
            "value": 31000,
            "etd": "2-3",
            "note": ""
          }
        ]
      }
    ]
  }
]
```

&nbsp;

## 4. POST /generate-midtrans-token

Description:

- Generate midtrans token

Request:

Request:

- body:

```json
{
  "email": "diki@mail.com",
  "phone": "080808",
  "name": "diki",
  "gross_amount": 5000000
}
```

_Response (201 - Created)_

```json
{
  "token": "e270ba2f-9124-4cc1-a8af-31525c8fc470",
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/e270ba2f-9124-4cc1-a8af-31525c8fc470"
}
```

&nbsp;

## 5. POST /transactional

Request:

- body:

```json

```

_Response (200 - OK)_

```json
{
  "id": 4,
  "order_id": "123",
  "gross_amount": "100000",
  "transaction_time": "2023-23-23",
  "payment_type": "credit_card",
  "email": "dikidiki@mail.com",
  "updatedAt": "2023-10-25T02:42:52.146Z",
  "createdAt": "2023-10-25T02:42:52.146Z",
  "isTestimonial": false
}
```

&nbsp;

## 6. POST /testimonial

Request:

- body:

```json
{
  "description": "NICE BOX",
  "image_url": "base64",
  "email": "dikidiki@mail.com"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 13,
    "description": "Test",
    "image_url": "https://i.ibb.co/h9Kv9Jp/07245eceb511.jpg",
    "email": "aku@mail.com",
    "createdAt": "2023-10-25T09:13:47.469Z",
    "updatedAt": "2023-10-25T09:13:47.469Z"
  }
]
```

_Response (404 - nottransactional)_

```json
{
  "message": "error invalid username or email or password"
}
```

&nbsp;

## 6. GET /testimonial

Request:

- body:

```json
{}
```

_Response (200 - OK)_

```json
[
  {
    "id": 13,
    "description": "WASUUUU.... Harus di ruqyah lu, min",
    "image_url": "https://i.ibb.co/h9Kv9Jp/07245eceb511.jpg",
    "email": "aku@mail.com",
    "createdAt": "2023-10-25T09:13:47.469Z",
    "updatedAt": "2023-10-25T09:13:47.469Z"
  }
]
```

&nbsp;

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
