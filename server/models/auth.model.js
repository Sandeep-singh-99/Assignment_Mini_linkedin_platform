import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";


const authSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    bio: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

authSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


authSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const Auth = model("Auth", authSchema);