import jwt from 'jsonwebtoken'
import { ENV } from './env.js'
const genToken = async (userId) => {
    try {
        const token = jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "7d" })
        return token
    } catch (error) {
        console.log(`Error occure Generate During The TOken ${error}`)
    }
    
    
}
export default genToken