# Address API Spec

## Create Address API

Endpoint: POST /api/contacts/:contactId/address

Headers:
- Authorization: token

Request Body:

```json
{
    "street": "Jalan apa",
    "city": "kota apa",
    "province": "Provinsi apa",
    "country": "Kota apa",
    "postalCode": "Kode pos"
}
```

Response Body Success:

```json
{
    "data": {
        "id": 1,
        "street": "Jalan apa",
        "city": "kota apa",
        "province": "Provinsi apa",
        "country": "Kota apa",
        "postalCode": "Kode pos"
    }
}
```

Response Body Error:

```json
{
    "errors": "Country us required",
}
```

## Update Address API

Endpoint: PUT /api/contacts/:contactId/address/:addressId

Headers:
- Authorization: token

Request Body:
```json
{
    "street": "Jalan apa",
    "city": "kota apa",
    "province": "Provinsi apa",
    "country": "Kota apa",
    "postalCode": "Kode pos"
}
```

Response Body Success:

```json
{
    "data": {
        "id": 1,
        "street": "Jalan apa",
        "city": "kota apa",
        "province": "Provinsi apa",
        "country": "Kota apa",
        "postalCode": "Kode pos"
    }
}
```

Response Body Error:

```json
{
    "errors": "country is required",
}
```

## Get Address API

Endpoint: GET /api/contacts/:contactId/address/:addressId

Headers:
- Authorization: token

Response Body Success:

```json
{
    "data": {
        "id": 1,
        "street": "Jalan apa",
        "city": "kota apa",
        "province": "Provinsi apa",
        "country": "Kota apa",
        "postalCode": "Kode pos"
    }
}
```

Response Body Error:

```json
{
    "errors": "Contact is not found",
}
```

## List Address API

Endpoint: GET /api/contacts/:contactId/address

Headers:
- Authorization: token

Response Body Success:

```json
{
    "data": [
        {
            "id": 1,
            "street": "Jalan apa",
            "city": "kota apa",
            "province": "Provinsi apa",
            "country": "Kota apa",
            "postalCode": "Kode pos"
        },
        {
            "id": 2,
            "street": "Jalan apa",
            "city": "kota apa",
            "province": "Provinsi apa",
            "country": "Kota apa",
            "postalCode": "Kode pos"
        },
    ]
}
```

Response Body Error:

```json
{
    "errors": "Unauthorized",
}
```

## Remove Address API

Endpoint: DELETE /api/contacts/:contactId/address/:addressId

Headers:
- Authorization: token

Response Body Success:

```json
{
    "data": "Address deleted"
}
```

Response Body Error:

```json
{
    "errors": "Address is not found"
}