

# Track3D Progress API (v1)

The Track3D Progress API lets you retrieve and upload progress, sign users in, and read external assets and asset categories used in your projects.

- **Base URL:** `https://progress-api.dev.track3d.ai`  
- **Version:** `v1`  
- **Auth:** API Key (header `x-api-key`) for all endpoints **except** `/v1/users/signin`

---

## Authentication

Include your API key on every request (except sign-in):

```
x-api-key: YOUR_API_KEY
```

> **Note:** `/v1/users/signin` does not require the API key.

---

## Errors

| Status | Meaning |
|---:|---|
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

Error shape (example):

```javascript
{
  "status": false,
  "message": "Error details"
}
```

---

## Endpoints

<!-- Order preserved; numbering updated to 1..6 -->

### 1) Sign In {#signin}

**POST** `/v1/users/signin`  
Sign in using email and password; returns user profile and tokens. *(No API key required.)*

**Request Body** (`application/json`)

```json
{
  "email": "user@example.com",
  "password": "••••••••"
}
```

**cURL**

```bash
curl -X POST "https://progress-api.dev.track3d.ai/v1/users/signin" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"your_password"}'
```

**Response `201` (example)**

```javascript
{
  "success": true,
  "result": {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "contact": { "code": "string", "number": 0 },
    "dob": "string",
    "verified": true,
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0,
    "avatar": "string",
    "isSupportUser": true,
    "unReadNotifications": ["string"],
    "status": "string",
    "loginType": "string",
    "resetPasswordTimestamps": ["string"],
    "verificationTimestamps": ["string"],
    "userPreference": "string",
    "fullName": "string",
    "age": 0,
    "canResendVerification": true,
    "canResetPassword": true,
    "provider": "string",
    "token": "string",
    "refreshToken": "string"
  }
}
```

**Response (error)**

```json
{ "status": false, "message": "Invalid credentials" }
```

---

### 2) Upload Progress {#upload-progress}

**POST** `/progress`  
Create a new progress entry for a project.

**Request Body** (`application/json`)

```json
{
  "projectId": "12345",
  "date": "2025-04-30",
  "status": "In Progress",
  "details": "Work started on the foundation."
}
```

**cURL**

```bash
curl -X POST "https://progress-api.dev.track3d.ai/progress" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId":"12345",
    "date":"2025-04-30",
    "status":"In Progress",
    "details":"Work started on the foundation."
  }'
```

**Response `201`**

```json
{
  "id": "progress1",
  "projectId": "12345",
  "date": "2025-04-30",
  "status": "In Progress",
  "details": "Work started on the foundation."
}
```

---

### 3) Get Progress (list) {#get-progress}

**GET** `/progress`  
Retrieve progress entries for a project, optionally filtered by date (`YYYY-MM-DD`).

**Query Params**

| Name | Type | Required | Description |
|---|---|:---:|---|
| `projectId` | string | ✅ | Project ID |
| `date` | string (date) |  | Filter by date `YYYY-MM-DD` |

**cURL**

```bash
curl -G "https://progress-api.dev.track3d.ai/progress" \
  -H "x-api-key: $API_KEY" \
  --data-urlencode "projectId=12345" \
  --data-urlencode "date=2025-04-30"
```

**Response `200`**

```json
[
  {
    "id": "progress1",
    "projectId": "12345",
    "date": "2025-04-30",
    "status": "Completed",
    "details": "Progress details here."
  }
]
```

---

### 4) Get Progress by ID {#get-progress-by-id}

**GET** `/progress/{id}`  
Retrieve a specific progress entry.

**Path Params**

| Name | Type | Required | Description |
|---|---|:---:|---|
| `id` | string | ✅ | Progress entry ID |

**cURL**

```bash
curl "https://progress-api.dev.track3d.ai/progress/progress1" \
  -H "x-api-key: $API_KEY"
```

**Response `200`**

```json
{
  "id": "progress1",
  "projectId": "12345",
  "date": "2025-04-30",
  "status": "Completed",
  "details": "Foundation work completed."
}
```

---

### 5) Get External Asset Categories (by Project) {#get-external-asset-categories}

**GET** `/api/external-asset-categories`  
Return all external asset categories for a project.

**Query Params**

| Name | Type | Required | Description |
|---|---|:---:|---|
| `project` | string | ✅ | Project ID |

**cURL**

```bash
curl -G "https://progress-api.dev.track3d.ai/api/external-asset-categories" \
  -H "x-api-key: $API_KEY" \
  --data-urlencode "project=pid"
```

**Response `200`**

```json
{
  "success": true,
  "result": [
    {
      "status": "string",
      "drawing": "string",
      "_id": "string",
      "name": "string",
      "project": "string",
      "stages": [
        {
          "_id": "string",
          "name": "string",
          "sequence": 0,
          "color": "string",
          "uom": "string",
          "measurement": "string",
          "metrics": { "structureId": 0 },
          "predecessors": [0]
        }
      ],
      "description": "string",
      "createdAt": "2025-08-25T14:53:56.052Z",
      "updatedAt": "2025-08-25T14:53:56.052Z",
      "height": 0,
      "uom": "string",
      "id": "string"
    }
  ]
}
```

---

### 6) Get External Assets (by Structure + Category) {#get-external-assets}

**GET** `/api/external-assets`  
Return all external assets for a given structure and category.

**Query Params**

| Name | Type | Required | Description |
|---|---|:---:|---|
| `structure` | string | ✅ | Structure ID |
| `category` | string | ✅ | Category name or ID |

**cURL**

```bash
curl -G "https://progress-api.dev.track3d.ai/api/external-assets" \
  -H "x-api-key: $API_KEY" \
  --data-urlencode "structure=sid123" \
  --data-urlencode "category=cat_name"
```

**Response `200`**

```json
{
  "success": true,
  "result": [
    {
      "_id": "UJPeP7rjrmfK4sASkmYVVA",
      "category": "J0MqOKvgZqDBA5gQ6yaYhw",
      "shape": "Polyline",
      "points": [
        { "x": 518867.7664488507, "y": 3707128.323726985 }
      ],
      "properties": { "snapshotDate": "2000-01-01T00:00:00.000Z" },
      "snapshot": "1999-12-31T00:00:00.000Z",
      "doNotTrack": false,
      "stages": [
        { "_id": "XTU9LaDkj1_oiugf4y4Hkg", "percentage": 100, "date": "2024-06-24T00:00:00.000Z" }
      ]
    }
  ]
}
```

---

## Data Models

### Progress

```json
{
  "id": "progress1",
  "projectId": "12345",
  "date": "2025-04-30",
  "status": "Completed",
  "details": "Progress details here."
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | string | Generated ID |
| `projectId` | string | Project identifier |
| `date` | string (YYYY-MM-DD) | Progress date |
| `status` | string | e.g., `In Progress`, `Completed` |
| `details` | string | Free-form notes |

### ExternalAsset

```json
{
  "_id": "UJPeP7rjrmfK4sASkmYVVA",
  "category": "J0MqOKvgZqDBA5gQ6yaYhw",
  "shape": "Polyline",
  "points": [{ "x": 518867.7, "y": 3707128.32 }],
  "properties": { "snapshotDate": "2000-01-01T00:00:00.000Z" },
  "snapshot": "1999-12-31T00:00:00.000Z",
  "doNotTrack": false,
  "stages": [{ "_id": "XTU9LaD...", "percentage": 100, "date": "2024-06-24T00:00:00.000Z" }]
}
```

### ExternalAssetCategory

```json
{
  "_id": "string",
  "name": "string",
  "project": "string",
  "stages": [
    { "_id": "string", "name": "string", "sequence": 0, "color": "string",
      "uom": "string", "measurement": "string", "metrics": { "structureId": 0 },
      "predecessors": [0] }
  ],
  "description": "string",
  "createdAt": "2025-08-25T14:53:56.052Z",
  "updatedAt": "2025-08-25T14:53:56.052Z",
  "height": 0,
  "uom": "string",
  "id": "string",
  "status": "string",
  "drawing": "string"
}
```

### SignIn (Request / Response)

**Request**

```json
{ "email": "user@example.com", "password": "••••••••" }
```

**Response (success)**

```json
{
  "success": true,
  "result": {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "contact": { "code": "string", "number": 0 },
    "dob": "string",
    "verified": true,
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0,
    "avatar": "string",
    "isSupportUser": true,
    "unReadNotifications": ["string"],
    "status": "string",
    "loginType": "string",
    "resetPasswordTimestamps": ["string"],
    "verificationTimestamps": ["string"],
    "userPreference": "string",
    "fullName": "string",
    "age": 0,
    "canResendVerification": true,
    "canResetPassword": true,
    "provider": "string",
    "token": "string",
    "refreshToken": "string"
  }
}
```

---

## Conventions

- Dates in progress lists use **`YYYY-MM-DD`**.  
- Timestamps in assets/categories are ISO **date-time** strings.  
- Only `/v1/users/signin` is unauthenticated; all other endpoints require `x-api-key`.  

  </main>
</div>
