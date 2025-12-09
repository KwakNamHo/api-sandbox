const jsonExamples = {
  valid: `{
  "name": "Namho",
  "age": 25,
  "isStudent": true,
  "skills": ["JS", "Next.js", "Security"]
}`,
  invalid: [
    {
      title: 'Key에 따옴표 없음',
      example: `{name: "Namho", age: 25}`,
      reason: `JSON에서는 key도 반드시 "key" 형태로 작성해야 합니다.`,
    },
    {
      title: '쉼표 누락',
      example: `{
  "name": "Namho"
  "age": 25
}`,
      reason: `속성 간에는 반드시 쉼표가 필요합니다.`,
    },
    {
      title: '문자열 따옴표 오류',
      example: `{
  "message": 'hello'
}`,
      reason: `JSON에서는 문자열에 반드시 쌍따옴표(")를 사용해야 합니다.`,
    },
    {
      title: '닫는 괄호 누락',
      example: `{
  "user": {
    "name": "Namho",
    "age": 25`,
      reason: `모든 { } 괄호는 반드시 짝이 맞아야 합니다.`,
    },
  ],
}

export default jsonExamples
