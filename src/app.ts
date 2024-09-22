import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import useragent from 'express-useragent'
import helmet from 'helmet'
import createError, { HttpError } from 'http-errors'
import { healthzPath, healthzRouter } from './routes/healthz'
import { userPath, userRouter } from './routes/user'

export function initApp() {
  const app = express()

  app.enable('trust proxy')

  app.use(cors())
  app.use(helmet())
  app.use(useragent.express())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // 회원 관련 처리 라우터 사용
  app.use(userPath, userRouter)

  app.options(
    '*',
    cors({
      allowedHeaders:
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    }),
  ) // preflight

  app.use(healthzPath, healthzRouter)

  app.use(
    (
      err: Error | HttpError,
      _req: Request,
      res: Response,
      _next: NextFunction,
    ) => {
      res.status(createError.isHttpError(err) ? err.statusCode : 500)
      res.json({ error: err.message })
    },
  )

  return app
}
