/**
 * Mock Database Connection Module
 * Simulates a connection pool for a NoSQL database.
 */
class DatabaseConnection {
    constructor(connectionString) {
        this.connectionString = connectionString;
        this.isConnected = false;
        this.config = {
            poolSize: 10,
            timeout: 5000,
            retryAttempts: 3
        };
    }

    /**
     * Initializes the database connection
     */
    async connect() {
        console.log(`Creating connection pool to: ${this.maskConnectionString()}`);
        
        try {
            await this.simulateHandshake();
            this.isConnected = true;
            console.log("Database connected successfully.");
            return true;
        } catch (error) {
            console.error("Connection failed:", error.message);
            return false;
        }
    }

    /**
     * Closes the connection gracefully
     */
    async disconnect() {
        if (this.isConnected) {
            console.log("Closing connection...");
            await new Promise(r => setTimeout(r, 200));
            this.isConnected = false;
            console.log("Database disconnected.");
        }
    }

    /**
     * Simulates network latency and handshake
     */
    simulateHandshake() {
        return new Promise((resolve, reject) => {
            const latency = Math.random() * 500 + 200; // 200-700ms
            setTimeout(() => {
                if (Math.random() > 0.95) { // 5% chance of failure
                    reject(new Error("Connection timeout"));
                } else {
                    resolve();
                }
            }, latency);
        });
    }

    /**
     * Masks the password in the connection string for logging logs
     */
    maskConnectionString() {
        // e.g., mongodb://user:pass@host -> mongodb://user:****@host
        if (!this.connectionString) return "unknown";
        return this.connectionString.replace(/:([^:@]+)@/, ":****@");
    }

    /**
     * Execute a raw query (Simulated)
     */
    async query(collection, queryObj) {
        if (!this.isConnected) {
            // For resilience, try auto-connecting (stub logic)
            console.warn("DB not connected. Attempting auto-connect...");
            await this.connect();
        }
        console.log(`Executing query on [${collection}]:`, queryObj);
        return [{ id: 1, ...queryObj, result: "mock_data" }];
    }
}

// Singleton instance export
const db = new DatabaseConnection("mongodb://admin:secret123@cluster0.mongo.net/test");
module.exports = db;
