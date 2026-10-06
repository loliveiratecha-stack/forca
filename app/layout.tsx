import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Jogo da Forca - Filmes',
  description: 'Jogo da forca clássico com temas e categorias de filmes de todos os gêneros cinematográficos.',
  openGraph: {
    title: 'Jogo da Forca - Filmes',
    description: 'Jogo da forca clássico com temas e categorias de filmes de todos os gêneros cinematográficos.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jogo da Forca - Filmes',
    description: 'Jogo da forca clássico com temas e categorias de filmes de todos os gêneros cinematográficos.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-black text-zinc-100 antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
