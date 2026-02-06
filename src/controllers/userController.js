/**
 * User Controller
 * Handles business logic for user-related API operations.
 */
class UserController {
    constructor() {
        // In-memory mock store
        this.users = [
            { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
            { id: 2, name: "Bob", email: "bob@example.com", role: "user" }
        ];
    }

    /**
     * Retrieve all users
     */
    async getAllUsers(req, res) {
        try {
            // Simulate DB delay
            await new Promise(resolve => setTimeout(resolve, 100));
            
            res.json({
                success: true,
                count: this.users.length,
                data: this.users
            });
        } catch (error) {
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }

    /**
     * Get a single user by ID
     */
    async getUserById(req, res) {
        const id = parseInt(req.params.id);
        const user = this.users.find(u => u.id === id);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.json({ success: true, data: user });
    }

    /**
     * Create a new user
     */
    async createUser(req, res) {
        const { name, email, role } = req.body;

        // Basic validation
        if (!name || !email) {
            return res.status(400).json({ 
                success: false, 
                error: "Please provide both name and email" 
            });
        }

        const newUser = {
            id: this.users.length + 1,
            name,
            email,
            role: role || "user",
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });
    }

    /**
     * Delete a user
     */
    async deleteUser(req, res) {
        const id = parseInt(req.params.id);
        const index = this.users.findIndex(u => u.id === id);

        if (index === -1) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        this.users.splice(index, 1);
        res.json({ success: true, message: `User ${id} deleted` });
    }
}

module.exports = new UserController();
