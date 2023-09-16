import express from 'express'
import { Connection } from './database/dbConnection.js'
import userRouter from './src/modules/user/user.routes.js'
import taskRouter from './src/modules/task/task.routes.js'
// import { sendEmail2 } from './email/mail.js'
import dotenv from 'dotenv'



dotenv.config()
const app = express()
const port = 3000
console.log(process.env.JWT_KEY)




app.use(express.json())
app.use(userRouter)
app.use(taskRouter)





Connection()
// sendEmail2()


app.listen(port, () => console.log(`Example app listening on port ${port}!`))