<!--
Track3D Progress API (v1) — Styled Markdown with Side Menu
Endpoints order (renumbered 1..6): Sign In, Upload Progress, Get Progress, Get by ID, Get External Asset Categories, Get External Assets
-->

<style>
:root{
  --bg: #0b0f19;
  --panel: #0f172a;
  --panel-2: #111827;
  --text: #e5e7eb;
  --muted: #9ca3af;
  --brand: #577CFF;
  --accent: #7F56D9; /* purple */
  --get: #10b981;
  --post: #3b82f6;
  --code: #0b1220;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
a { color: var(--brand); text-decoration: none; }
a:hover { text-decoration: underline; }
.doc { display: grid; grid-template-columns: 260px 1fr; gap: 24px; }
@media (max-width: 960px){ .doc { grid-template-columns: 1fr; } .sidebar { position: static !important; max-height: none; } }
/* Purple header */
header.page { background: var(--accent); color: white; border-bottom: 1px solid rgba(255,255,255,.2); padding: 28px 20px; margin: -16px -16px 24px -16px; }
header.page h1 { margin: 0; }
.sidebar { position: sticky; top: 16px; align-self: start; background: var(--panel); border: 1px solid rgba(255,255,255,.07); border-radius: 14px; padding: 16px; max-height: calc(100vh - 32px); overflow: auto; }
.sidebar h3 { margin: 0 0 8px 0; font-size: 14px; letter-spacing: .02em; color: var(--muted); text-transform: uppercase; }
.nav { list-style: none; padding: 0; margin: 0; }
.nav li { margin: 6px 0; }
.nav a { display: block; padding: 6px 8px; border-radius: 8px; color: var(--text); }
.nav a:hover { background: rgba(127,86,217,.25); }
.nav .sub { margin-left: 10px; border-left: 2px solid rgba(255,255,255,.07); padding-left: 10px; }
.content { background: var(--panel-2); border: 1px solid rgba(255,255,255,.07); border-radius: 14px; padding: 24px; }
h1, h2, h3 { scroll-margin-top: 90px; }
h1 { font-size: 28px; margin-top: 0; }
h2 { font-size: 22px; margin-top: 28px; border-top: 1px dashed rgba(255,255,255,.08); padding-top: 18px; }
h3 { font-size: 18px; margin-top: 18px; }
.badge { display: inline-block; font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 999px; letter-spacing: .02em; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.06); }
.badge-get { background: rgba(16,185,129,.15); border-color: rgba(16,185,129,.4); color: #a7f3d0; }
.badge-post { background: rgba(59,130,246,.15); border-color: rgba(59,130,246,.4); color: #bfdbfe; }
.box { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 16px; }
table { width: 100%; border-collapse: collapse; }
th, td { border-bottom: 1px solid rgba(255,255,255,.1); text-align: left; padding: 8px 10px; }
pre { background: var(--code); border: 1px solid rgba(255,255,255,.08); border-radius: 10px; padding: 14px; overflow: auto; }
</style>

<header class="page">
  <h1 id="top">Track3D Progress API (v1)</h1>
</header>

<div class="doc">
  <aside class="sidebar">
    <h3>On this page</h3>
    <ul class="nav">
      <li><a href="#track3d-progress-api-v1">Overview</a></li>
      <li><a href="#authentication">Authentication</a></li>
      <li><a href="#errors">Errors</a></li>
      <li><a href="#endpoints">Endpoints</a>
        <ul class="nav sub">
          <li><a href="#signin">1) Sign In</a></li>
          <li><a href="#upload-progress">2) Upload Progress</a></li>
          <li><a href="#get-progress">3) Get Progress (list)</a></li>
          <li><a href="#get-progress-by-id">4) Get Progress by ID</a></li>
          <li><a href="#get-external-asset-categories">5) Get External Asset Categories</a></li>
          <li><a href="#get-external-assets">6) Get External Assets</a></li>
        </ul>
      </li>
      <li><a href="#data-models">Data Models</a></li>
      <li><a href="#conventions">Conventions</a></li>
      <li><a href="#top">Back to top</a></li>
    </ul>
  </aside>

  <main class="content">

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

```json
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
