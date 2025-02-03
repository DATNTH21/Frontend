'use client';
import Editor from '@/components/ui/tiptap/editor';
import { editorMode } from '@/components/ui/tiptap/extensions';
import { useRef, useEffect } from 'react';
import { Editor as TipTapEditor } from '@tiptap/react';

export default function Home() {
  const data = `<p>Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.</p><p>By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you <em>really are</em> just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.</p><p>We get lots of complaints about it actually, with people regularly asking us things like:</p><blockquote><p><strong><em>Why is Tailwind removing the default styles on my </em></strong><code>h1</code><strong><em> elements? How do I disable this? What do you mean I lose all the other base styles too?</em></strong></p></blockquote><p>We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a <code>p</code> element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look <em>awesome</em>, not awful.</p><p>The <code>@tailwindcss/typography</code> plugin is our attempt to give you what you <em>actually</em> want, without any of the downsides of doing something stupid like disabling our base styles.</p><p>It adds a new <code>prose</code> class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:</p>`;

  const editorRef = useRef<TipTapEditor | null>(null);
  const htmlContent = editorRef.current?.getHTML();
  const plainText = editorRef.current?.getText();
  const jsonContent = editorRef.current?.getJSON();

  console.log('HTML: ', htmlContent);
  console.log('Text: ', plainText);
  console.log('JSON: ', jsonContent);

  const handleOnUpdate = (editor: TipTapEditor) => {
    console.log('Update content: ', editor.getHTML());
  };

  return (
    <div className='container'>
      <Editor ref={editorRef} editable editorType={editorMode.fullFeatured} content={data} onUpdate={handleOnUpdate} />
    </div>
  );
}
