import Header from './partials/Header'
import FooterCustom from './partials/Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow w-full">
        <div className="w-full">{children}</div>
      </main>
      <FooterCustom />
    </div>
  )
}
