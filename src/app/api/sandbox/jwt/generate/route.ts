import { NextResponse } from 'next/server'
import crypto from 'crypto'

function base64url(input: Buffer) {
  return input
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export async function POST(req: Request) {
  const { payload, secret } = await req.json()

  try {
    const header = { alg: 'HS256', typ: 'JWT' }
    const encodedHeader = base64url(Buffer.from(JSON.stringify(header)))
    const encodedPayload = base64url(Buffer.from(payload))

    const signature = crypto
      .createHmac('sha256', secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest()

    const encodedSignature = base64url(signature)

    const token = `${encodedHeader}.${encodedPayload}.${encodedSignature}`

    return NextResponse.json({ token })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to create JWT', message: err.message },
      { status: 400 }
    )
  }
}
