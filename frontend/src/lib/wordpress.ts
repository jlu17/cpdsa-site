const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://localhost:8080/wp-json/wp/v2';

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}

export async function getPages(): Promise<WPPage[]> {
  const res = await fetch(`${WORDPRESS_API_URL}/pages`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch pages');
  return res.json();
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const res = await fetch(`${WORDPRESS_API_URL}/pages?slug=${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch page');
  const pages = await res.json();
  return pages[0] || null;
}
