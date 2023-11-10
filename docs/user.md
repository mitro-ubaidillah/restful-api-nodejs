# User API Spec

## Register User API

Endpoint: POST /api/users

Request Body:

```json
{
    "username": "mitro",
    "password": "rahasia123",
    "name": "Muchamad Mitro Ubaidillah"
}
```

Response Body Success:

```json
{
    "data": {
        "username": "mitro",
        "name": "Muchamad Mitro Ubaidillah"
    }
}
```

Response Body Error
```json
{
    "errors": "Username already registered",
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body:

```json
{
    "username": "mitro",
    "password": "rahasia123",
}
```

Response Body Success:

```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Response Body Error:

```json
{
    "errors": "Username or password wrong",
}
```

## Update User API

Endpoint: PATCH /api/users/current

Headers: 
- Authorization: token

Request Body:

```json
{
    "name": "new name", //optional
    "password": "new password", //optional
}
```

Response Body Success: 

```json
{   
    "data": {
        "username": "mitro",
        "name": "Muchamad Mitro Ubaidillah"
    }
}
```

Response Body Success:

```json
{
    "errors": "Name length maz 100",
}
```

## Get User API

Endpoint: GET /api/users/current

Headers: 
- Authorization: token

Response body Success:

```json
{   
    "data": {
        "username": "mitro",
        "name": "Muchamad Mitro Ubaidillah"
    }
}
```

Response Body Error:

```json
{   
    "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers: 
- Authorization: token

Response Body Success:

```json
{   
    "data": "Logout success"
}
```

Response Body Error:

```json
{   
    "errors": "Unauthorized"
}
```