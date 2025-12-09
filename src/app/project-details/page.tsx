'use client'

export default function ProjectDetailsPage() {
  return (
    <main className="w-full max-w-4xl mx-auto py-12 px-4 text-neutral-800 dark:text-neutral-200">
      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-2">사용 기술 상세 설명</h1>
      <p className="text-neutral-500 mb-10">
        이 프로젝트(API Sandbox)에서 사용된 주요 기술과 구현 의도를 설명합니다.
      </p>

      {/* 1. 프로젝트 개요 */}
      <section className="mb-10 p-6 rounded-xl border shadow-sm bg-white dark:bg-neutral-900">
        <h2 className="text-xl font-semibold mb-3">1. 프로젝트 개요</h2>
        <p className="leading-relaxed">
          API Sandbox는 웹 개발과 보안 학습을 위해 설계된 포트폴리오
          홈페이지입니다.
          <br />
          Next.js 기반으로 API 요청 처리, JWT 생성·검증, JSON 구조 분석, 에러
          응답 시뮬레이션 등 실제 서비스 개발에서 핵심적으로 사용되는 기술을
          직접 테스트할 수 있도록 구성하였습니다.
        </p>
      </section>

      {/* 2. 기술 스택 */}
      <section className="mb-10 p-6 rounded-xl border shadow-sm bg-white dark:bg-neutral-900">
        <h2 className="text-xl font-semibold mb-4">2. 기술 스택</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 프론트엔드 */}
          <div className="p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-800">
            <h3 className="font-semibold text-lg mb-2">Frontend</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>Next.js 14 (App Router)</li>
              <li>React Hooks (useState 등)</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          {/* 백엔드 */}
          <div className="p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-800">
            <h3 className="font-semibold text-lg mb-2">Backend / API</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>Next.js API Routes</li>
              <li>JWT (HS256 서명)</li>
              <li>Custom JSON Validator</li>
              <li>Error Response Simulator</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. 주요 기능 설명 */}
      <section className="mb-10 p-6 rounded-xl border shadow-sm bg-white dark:bg-neutral-900">
        <h2 className="text-xl font-semibold mb-4">3. 주요 기능 설명</h2>

        <div className="space-y-6">
          {/* POST 요청 테스트 */}
          <div>
            <h3 className="font-semibold text-lg">✔ POST 요청 테스트</h3>
            <p className="text-ms mt-1 leading-relaxed">
              클라이언트 → 서버로 JSON 데이터를 전송하고, 서버에서 입력값을
              검증한 뒤 응답을 반환하는 흐름을 테스트하는 기능입니다. <br />
              REST API의 기본 구조(요청 / 바디 / 응답)를 이해하기 위한
              실습입니다.
            </p>
          </div>

          {/* 에러 코드 시뮬레이터 */}
          <div>
            <h3 className="font-semibold text-lg">✔ 에러 응답 시뮬레이터</h3>
            <p className="text-ms mt-1 leading-relaxed">
              400, 401, 403, 404, 422, 500 등 다양한 HTTP 에러 코드를 직접
              발생시켜보며 상황에 따른 서버의 응답 방식을 확인할 수 있습니다.{' '}
              <br />
              API 예외 처리 로직의 중요성을 학습할 수 있습니다.
            </p>
          </div>

          {/* JWT */}
          <div>
            <h3 className="font-semibold text-lg">✔ JWT 생성 & 검증</h3>
            <p className="text-ms mt-1 leading-relaxed">
              HS256 알고리즘을 사용하여 JWT를 생성하고, Secret Key가 일치하는지
              확인하여 인증 구조를 이해할 수 있습니다. <br />
              인증(Authentication)과 인가(Authorization)의 작동 방식을 체험할 수
              있습니다.
            </p>
          </div>

          {/* JSON Validator */}
          <div>
            <h3 className="font-semibold text-lg">✔ JSON 구조 검사기</h3>
            <p className="text-ms mt-1 leading-relaxed">
              JSON 문법 오류를 분석하고, 오류 메시지와 자동 수정 JSON 예시를
              제공하는 기능입니다. <br />
              JSON 파싱 실패가 실제 서비스에서 어떻게 오류를 발생시키는지 학습할
              수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 4. 사용된 API 상세 설명 (새로 추가된 섹션) */}
      <section className="mb-10 p-6 rounded-xl border shadow-sm bg-white dark:bg-neutral-900">
        <h2 className="text-xl font-semibold mb-4">4. 사용된 API 상세 설명</h2>

        <div className="space-y-6 leading-relaxed text-ms">
          {/* POST API */}
          <div>
            <h3 className="font-semibold text-lg mb-1">POST 입력 검증 API</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              <strong>Endpoint:</strong> <code>/api/sandbox/post</code>
              <br />
              클라이언트가 입력한 JSON 데이터를 서버에서 검증하고, 올바르지 않은
              경우 400 에러를 반환합니다. REST API 구조와 Validation 흐름을
              이해하기 위한 핵심 실습입니다.
            </p>
          </div>

          {/* JSON Validator API */}
          <div>
            <h3 className="font-semibold text-lg mb-1">JSON 구조 검사 API</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              <strong>Endpoint:</strong> <code>/api/sandbox/json</code>
              <br />
              JSON 문법 오류를 분석하고, 오류 설명과 자동 수리된 JSON 예시를
              제공합니다. Custom Parser를 통해 JSON 파싱 에러가 실제 서비스에서
              어떻게 처리되는지를 학습할 수 있습니다.
            </p>
          </div>

          {/* JWT Generate */}
          <div>
            <h3 className="font-semibold text-lg mb-1"> JWT 생성 API</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              <strong>Endpoint:</strong> <code>/api/sandbox/jwt/generate</code>
              <br />
              HS256 알고리즘을 적용하여 JWT를 생성합니다. Payload + Secret Key →
              암호학적 서명(Signature) 생성 과정을 직접 확인할 수 있습니다.
            </p>
          </div>

          {/* JWT Verify */}
          <div>
            <h3 className="font-semibold text-lg mb-1"> JWT 검증 API</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              <strong>Endpoint:</strong> <code>/api/sandbox/jwt/verify</code>
              <br />
              JWT의 Signature가 Secret Key와 일치하는지를 검증합니다.
              인증(Authentication)과 토큰 위조 방지 개념을 이해하는 데 직접적인
              도움이 됩니다.
            </p>
          </div>

          {/* Error Simulator */}
          <div>
            <h3 className="font-semibold text-lg mb-1">
              에러 코드 시뮬레이터 API
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              <strong>Endpoint:</strong> <code>/api/sandbox/errors/[code]</code>
              <br />
              400, 401, 403, 404, 422, 500 등 다양한 상태 코드를 직접 반환하여
              서버의 예외 처리 방식 및 클라이언트의 에러 핸들링 방식을 실습할 수
              있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 5. 보안적 의미 */}
      <section className="mb-10 p-6 rounded-xl border shadow-sm bg-white dark:bg-neutral-900">
        <h2 className="text-xl font-semibold mb-3">5. 보안적 의미</h2>
        <ul className="list-disc ml-5 space-y-2 text-MS leading-relaxed">
          <li>
            입력값 검증(Input Validation)의 중요성을 직접 체험할 수 있습니다.
          </li>
          <li>
            JWT 인증 구조를 이해하여 토큰 위조 방지 개념을 학습할 수 있습니다.
          </li>
          <li>
            서버 오류 코드에 따라 다른 응답을 반환하는 예외 처리 방식을 익힐 수
            있습니다.
          </li>
          <li>
            JSON 구조 오류가 어떤 문제를 일으키는지 명확하게 이해할 수 있습니다.
          </li>
        </ul>
      </section>

      {/* 6. 배운 점 */}
      <section className="mb-20 p-6 rounded-xl border shadow-sm bg-white dark:bg-neutral-900">
        <h2 className="text-xl font-semibold mb-3">6. 배운 점</h2>
        <p className="leading-relaxed text-sm">
          이번 프로젝트를 통해 API 구조, 입력 검증, 에러 처리, JWT 인증 구조에
          대한 이해도를 높일 수 있었습니다. <br />
          단순 UI 구현이 아니라 "요청 → 서버 처리 → 검증 → 응답"의 전체 흐름과
          보안 개념을 직접 구현하며 실무 서비스에서 API가 어떻게 동작하는지
          명확하게 체감했습니다.
        </p>
      </section>
    </main>
  )
}
