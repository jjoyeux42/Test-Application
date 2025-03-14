import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center p-4">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">404 - Page non trouvée</h1>
      <p className="mb-8 text-lg text-gray-600">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link 
        href="/"
        className="rounded-xl border-b-4 border-blue-500 bg-blue-400 px-6 py-3 font-bold text-white transition hover:brightness-105"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}