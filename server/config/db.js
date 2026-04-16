import mongoose from 'mongoose'
import dotenv from 'dotenv'

const connectDb = async() => {
     try {
        const conn_db = process.env.DB
          const conn = await mongoose.connect(conn_db)
          console.log(`✅ ${conn.connection.name} Database Connected SuccessFully and Running on 🌐 http://${conn.connection.host}:${conn.connection.port}`)
   } catch (error) {
     console.log(error,' ❌ Database Failed to Connect')
   }
}

export default connectDb;