import { NextFunction, Request, Response, Router } from 'express'
import { query } from 'express-validator'
import { validate } from '../public/router.helper'

export const samplePath = '/sample'
export const sampleRouter = Router()

sampleRouter.get(
  '/mypath',
  validate([query('sampleId').isNumeric().exists()]),
  async (req: Request, res: Response, _next: NextFunction) => {
    const { sampleId } = req.body

    console.info(`sampleId is ${sampleId}`)

    res.json({ sample: { id: Number(sampleId) } })
  },
)
