const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request made to: ${req.url}`);
    next();
});
t
const sendResponse = (res, status, message) => {
    return res.status(status).json({
        message: message,
        time: new Date().toLocaleString()
    });
};

let users = [
    { id: 1, name: "Sample Name", email: "sample@email.com" }
];

app.get('/', (req, res) => {
    res.send("Server Running");
});

app.get('/users', (req, res) => {
    res.json(users);
});
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return sendResponse(res, 404, "User not found");
    }
    res.json(user);
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return sendResponse(res, 400, "Name and email are required");
    }

    const duplicate = users.find(u => u.email === email);
    if (duplicate) {
        return sendResponse(res, 400, "Email already exists");
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);
    sendResponse(res, 201, "User added successfully");
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return sendResponse(res, 404, "User not found");
    }

    users.splice(userIndex, 1);
    sendResponse(res, 200, "User deleted successfully");
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Condition: Fields missing
    if (!email || !password) {
        return sendResponse(res, 400, "All fields required");
    }

    if (email === "admin@test.com" && password === "password123") {
        sendResponse(res, 200, "Login Success");
    } else {
        sendResponse(res, 401, "Invalid Credentials");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});