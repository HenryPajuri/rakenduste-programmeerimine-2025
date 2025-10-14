import './globals.css'

export const metadata = {
  title: 'Books Library',
  description: 'Manage your book collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
