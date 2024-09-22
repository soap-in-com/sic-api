import { NextFunction, Request, Response, Router } from 'express'

export const userPath = '/user'
export const userRouter = Router()

/**
 * 로그인 OR 회원 가입
 * 
 * - 유저 데이터베이스에 회원 정보가 존재하는 경우: 로그인
 * - 유저 데이터베이스에 회원 정보가 존재하지 않는 경우: 회원 가입
 */
userRouter.post(
  '/',
  async (req: Request, res: Response, _next: NextFunction) => {
    console.log('로그인 및 회원 가입', req.body)

    res.json({message: 'OK'})
},
)
