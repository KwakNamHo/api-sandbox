// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const code = Number(params.code)

  const messages: Record<number, string> = {
    400: '잘못된 요청입니다.',
    401: '인증이 필요합니다.',
    403: '접근이 거부되었습니다.',
    404: '요청한 리소스를 찾을 수 없습니다.',
    409: '이미 존재하는 리소스 충돌이 발생했습니다.',
    418: "I'm a teapot",
    422: '입력값이 잘못되었습니다.',
    429: '너무 많은 요청입니다.',
    500: '서버 내부 오류가 발생했습니다.',
    503: '서버를 사용할 수 없습니다.',
  }

  const message = messages[code] ?? 'Unknown error'

  return NextResponse.json(
    {
      success: false,
      error: code,
      message,
    },
    { status: code }
  )
}
