import mongoose from "mongoose"

// interface to ensure typechecking of typescript
interface UserAttrs {
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

const User = mongoose.model("User", userSchema)

// helper function to help using the interface
const buildUser = (attrs: UserAttrs) => {
    return new User(attrs)
}

export { User, buildUser }