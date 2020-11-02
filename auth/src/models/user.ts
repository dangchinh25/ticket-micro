import mongoose from "mongoose"

// interface to ensure typechecking of typescript
interface UserAttrs {
    email: string,
    password: string
}

// interface describe the properties that a User model has
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): any
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<any, UserModel>("User", userSchema)

export { User }