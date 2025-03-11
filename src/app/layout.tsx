import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getSiteSettings } from '@/utils/settings';

const inter = Inter({ subsets: ['latin'] });

// 使用动态元数据
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  // 使用 SEO 设置，如果没有则使用默认值
  const title = settings.seoTitle || settings.siteName;
  const description = settings.seoDescription || settings.siteDescription;
  const keywords = settings.seoKeywords;

  return {
    title: {
      absolute: title,
    },
    description: description,
    keywords: keywords,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
