// src/app/sandbox/components/data/jwtExamples.ts

export const jwtExamples = {
  header: `{
  "alg": "HS256",
  "typ": "JWT"
}`,

  payload: `{
  "name": "Namho",
  "role": "admin"
}`,

  secret: `my-secret-key`,

  sampleToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmFtaG8iLCJyb2xlIjoiYWRtaW4ifQ.BB-RczSO0oe9eyYe-xSUX450VCNZxVLBsr_GqLs3y3U`,

  explanation: `
JWT(JSON Web Token)는 로그인 인증과 권한(인가) 확인을 위해 사용되는 서명 기반 토큰입니다.

로그인 성공 → 서버가 JWT 생성 → 클라이언트가 저장 → 요청마다 토큰을 함께 보내 “내가 누구인지” 증명합니다.

JWT 구성은 다음 3부분으로 이루어져 있습니다:
1) Header — 알고리즘 정보 (예: HS256)
2) Payload — 사용자 정보 (예: name, role)
3) Signature — 위조 여부를 확인하기 위한 서명

주의사항:
- Payload는 암호화가 아닙니다(Base64). 민감한 정보 넣으면 안 됩니다.
- Secret key가 유출되면 모든 토큰이 위조될 수 있습니다.
- 반드시 exp(만료시간)를 설정하는 것이 권장됩니다.
`,
}
