import { NextFunction, Request, Response, Router } from 'express';
import rateLimit from 'express-rate-limit'; // express-rate-limit 타입 임포트
import jwt, { JwtPayload } from 'jsonwebtoken'; // jsonwebtoken 타입 임포트
import { db } from '../database';

export const userPath = '/user'
export const userRouter = Router()

/**
 * 회원 정보 조회
 */
userRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { kakaoId } = req.body

      console.log('회원 정보 조회', kakaoId)

      if(!kakaoId) {
        throw new Error('kakaoId는 필수 전달 값입니다.')
      }

      const users = db.ref('users')
      const userSnapShot = await users.orderByChild('kakaoId').equalTo(kakaoId).once('value');

      if(userSnapShot.exists()) {
        const user = userSnapShot.val()

        res.json({user})
      } else {
        throw new Error('not found user')
      }
    }
    catch(err) {
      next(err)
    }
  },
)

/**
 * 로그인 OR 회원 가입
 * 
 * - 유저 데이터베이스에 회원 정보가 존재하는 경우: 로그인
 * - 유저 데이터베이스에 회원 정보가 존재하지 않는 경우: 회원 가입
 */
userRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('로그인 및 회원 가입', req.body)

      const users = db.ref('users')

      const kakaoId = 'sample-kakao-id'

      // 회원 정보 조회
      const userSnapShot = await users.orderByChild('kakaoId').equalTo(kakaoId).once('value');

      if(userSnapShot.exists()) {
        const user = userSnapShot.val()

        console.log('회원 정보 찾음!', user)
      } else {
        console.log(`${kakaoId}에 해당하는 회원을 찾을 수 없음`)
      }
    
      // 회원 가입 처리
      // const newUser = users.push()
      // await newUser.set({
      //   kakaoId: 'sample-kakao-id',
      //   nickname: 'sample-nickname',
      //   phone: 'sample-phone'
      // });

      res.json({message: 'OK'}) 
    }catch(err) {
      next(err)
    }
  }
)
