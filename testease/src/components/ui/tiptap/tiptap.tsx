'use client';

import { useEditor, EditorContent, EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import MenuBar from './menu-bar';
import { Separator } from '../separator';
type TiptapProps = {
  initialContent: string;
  onContentChange: (content: string) => void;
};
const Tiptap = ({ initialContent, onContentChange }: TiptapProps) => {
  const extensions = [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    Highlight,
    Text,
    TextStyle,
    Document
  ];
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent || '',
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    }
  });
  if (!editor) {
    return null;
  }
  return <div className='flex flex-col'> <MenuBar/> <Separator/> <EditorContent editor={editor} /></div>;
};

export default Tiptap;
