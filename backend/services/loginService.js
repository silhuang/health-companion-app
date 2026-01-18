
import { getDB } from '../config/database.js';

import { v4 as uuidv4 } from 'uuid';

// basic login
export class userService {

    db = getDB();

    users = this.db.collection("users");

    constructor() {

    }

    async createUser(email, password) {
        const userId = uuidv4();


        await this.users.insertOne({
            userId: userId,
            email: email,
            password: password
        });
        console.log("User created with ID:", userId);
    }

    async updateUser(userId, updatedPassword) {
        await this.users.updateOne(
            { userId: userId },
            { $set: { password: updatedPassword } },
        );
    }

    async login(email, password) {
        const user = await this.users.findOne({
            email: email,
            password: password
        });
        if (user !== null) {
            return user.userId;
        }
        return null;

    }




}