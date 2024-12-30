"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield client.user.findMany();
    res.status(200).json(users);
}));
app.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        let user = yield client.user.findFirst({
            where: { id: Number(id) },
            select: { username: true, city: true, age: true, todos: true },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).send("User not found");
    }
}));
app.get("/todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        let user = yield client.user.findFirst({
            where: { id: Number(id) },
            select: { todos: true },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).send("User not found");
    }
}));
app.listen(3000, () => {
    console.log("Server up and running");
});
