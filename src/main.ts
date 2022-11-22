import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();

app.use(cors())
app.use(express.json())

// get routes
import adminRoutes from './Admin/admin.routes.js';
import userRoutes from './User/user.routes.js';
import visitorLogRoutes from './VisitorLog/visitorlog.routes.js';



app.listen(process.env.PORT || 5082, () => {
    console.log(`Server is running on ${process.env.PORT || 5082}`)
})

app.get('/api', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server running"
    })
})

app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)
app.use('/api/visitorlog', visitorLogRoutes)
