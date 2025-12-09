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
  const { token, secret } = await req.json()

  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.')

    if (!headerB64 || !payloadB64 || !signatureB64)
      throw new Error('Invalid JWT format')

    const expectedSignature = base64url(
      crypto
        .createHmac('sha256', secret)
        .update(`${headerB64}.${payloadB64}`)
        .digest()
    )

    const valid = expectedSignature === signatureB64

    const payloadJson = Buffer.from(payloadB64, 'base64').toString()

    return NextResponse.json({
      valid,
      payload: JSON.parse(payloadJson),
      expectedSignature,
      receivedSignature: signatureB64,
    })
  } catch (err: any) {
    return NextResponse.json(
      { valid: false, error: err.message },
      { status: 400 }
    )
  }
}
