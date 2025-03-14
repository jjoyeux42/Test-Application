import { type NextPage } from 'next'
import Link from 'next/link'
import { type NextPageContext } from 'next'

interface ErrorProps {
  statusCode: number
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center p-4">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">
        {statusCode ? `Erreur ${statusCode}` : 'Une erreur est survenue'}
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        Nous sommes désolés, quelque chose s&apos;est mal passé.
      </p>
      <Link 
        href="/"
        className="rounded-xl border-b-4 border-green-600 bg-green-500 px-6 py-3 font-bold text-white transition hover:brightness-105"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? (err.statusCode || 500) : 404
  return { statusCode }
}

export default Error