import mongoose from "mongoose"

// interface describe the properties that are required to create a new User
interface UserAttrs {
    email: string,
    password: string
}

// interface describe the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

// interface describe the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string,
    password: string
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

// the part in <> is called generics in typescript, it is like argument for a function but instead of passing value to use,
// we pass in type to tell the function to use and return value of that type
const User = mongoose.model<UserDoc, UserModel>("User", userSchema)

export { User }