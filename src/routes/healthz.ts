import { NextFunction, Request, Response, Router } from 'express'

export const healthzPath = '/healthz'
export const healthzRouter = Router()

healthzRouter.get(
  '/readiness',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: 'OK' })
    } catch (err) {
      return next(err)
    }
  },
)

healthzRouter.get(
  '/liveness',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: 'OK' })
    } catch (err) {
      return next(err)
    }
  },
)
