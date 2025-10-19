import Image from 'next/image'

interface GithubUser {
  login: string
  avatar_url: string
  public_repos: number
  followers: number
  html_url: string
}

export default async function GithubProfile() {
  const res = await fetch('https://api.github.com/users/KwakNamHo', {
    headers: {
      'User-Agent': 'portfolio-demo',
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    return (
      <div className="text-red-500 font-medium">
        프로필 정보를 불러오지 못했습니다.
      </div>
    )
  }

  const user: GithubUser = await res.json()

  return (
    <div className="mx-auto max-w-sm p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={user.avatar_url}
          alt="GitHub Avatar"
          width={96}
          height={96}
          className="rounded-full border shadow-md"
        />
        <h3 className="text-xl font-semibold">{user.login}</h3>
        <p className="text-gray-600">
          공개 저장소: <strong>{user.public_repos}</strong>개 <br />
          팔로워: <strong>{user.followers}</strong>명
        </p>
        <a
          href={user.html_url}
          target="_blank"
          className="inline-block mt-2 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Visit GitHub
        </a>
      </div>
    </div>
  )
}
