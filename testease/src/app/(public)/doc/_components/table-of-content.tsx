'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    const article = document.querySelector('.article');
    if (!article) return;

    const headings = Array.from(article.querySelectorAll('h2, h3')) as HTMLHeadingElement[];

    const newToc = headings.map((heading) => {
      const id = heading.innerText.toLowerCase().replace(/\s+/g, '-');
      heading.id = id;

      return {
        id,
        text: heading.innerText,
        level: Number(heading.tagName.substring(1))
      };
    });

    setToc(newToc);
  }, []);

  if (toc.length === 0) return null;

  return (
    <>
      <h3 className='font-bold mb-3'>Table of Contents</h3>
      <ul className='space-y-2 text-sm'>
        {toc.map((item) => (
          <li key={item.id} className={`ml-${(item.level - 2) * 4}`}>
            <Link href={`#${item.id}`} className='dark:text-[#A1A1A1]'>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
