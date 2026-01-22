# Database Configuration Guide

## Overview
The application uses a simulated NoSQL connection module (`src/db/index.js`). This module implements a robust `DatabaseConnection` class that handles:

- Connection pooling simulation
- Automatic retries
- Timeout handling
- Secure connection string masking in logs

## Setup

No external database installation is required for development as this runs in "mock mode".

## Environment Variables

In a production environment, you would configure the following:

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_URI` | The connection string for the database | `mongodb://localhost:27017/app` |
| `DB_POOL_SIZE` | Max concurrent connections | `10` |
| `DB_TIMEOUT` | Connection timeout in ms | `5000` |

## Usage

```javascript
const db = require('./src/db');

// Connect
await db.connect();

// Query
const results = await db.query('users', { id: 123 });
```

## Troubleshooting

If you see `Connection timeout` errors in the logs, it is likely due to the simulated "chaos monkey" in `simulateHandshake()`. This is intentional behavior to test error handling.
