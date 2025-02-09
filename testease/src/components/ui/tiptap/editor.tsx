'use client';
import { Editor as TipTapEditor, EditorContent, useEditor } from '@tiptap/react';
import { editorMode, getEditorExtensionsByType } from './extensions';
import { forwardRef } from 'react';
import Toolbar from './toolbar/toolbar';
import BubbleMenu from './toolbar/bubble-menu';

interface EditorProps {
  editable?: boolean;
  editorType: editorMode;
  onUpdate?: (editor: TipTapEditor) => void;
  content: string;
  className?: string;
}

const Editor = forwardRef<TipTapEditor | null, EditorProps>((props, ref) => {
  const { editable = true, editorType, onUpdate, content, className } = props;

  const extensions = getEditorExtensionsByType(editorType);

  const editor = useEditor({
    onUpdate: ({ editor }) => {
      if (onUpdate) onUpdate(editor);
    },
    immediatelyRender: false,
    extensions,
    editable,
    content: content,
    editorProps: {
      attributes: {
        class: 'outline-none px-4 py-2 rounded-lg prose max-w-full bg-background text-foreground dark:prose-invert'
      }
    }
  });

  if (ref) {
    (ref as React.MutableRefObject<TipTapEditor | null>).current = editor;
  }

  if (!editor) {
    return null;
  }

  return (
    <>
      <Toolbar editor={editor} />
      <BubbleMenu editor={editor} />

      {/* Scrollable Editor Content */}
      <div className='flex-1 overflow-hidden border-2 border-primary rounded-lg'>
        <div className='overflow-auto h-full'>
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
});

export default Editor;
