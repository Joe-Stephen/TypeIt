"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router"));
//setting up express app
const app = (0, express_1.default)();
const port = 3000 || process.env.port;
//express configuration
app.use((0, cors_1.default)()); //enabling cors
app.use((0, helmet_1.default)()); //enabling helmet for security
app.use((0, morgan_1.default)("dev")); //enabling morgan for logging
//starting the express app
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//route for testing server
app.get("/ping", (req, res) => {
    return res.send("pong");
});
//assigning routes
app.use("/", router_1.default);
exports.default = app;
