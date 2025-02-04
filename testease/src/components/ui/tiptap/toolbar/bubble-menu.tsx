import { Editor, BubbleMenu as TiptapBubbleMenu } from '@tiptap/react';
import { getActiveExtensions } from '../utils/helpers';
import { Bold, Divider, Extractor, Italic, Strike, Underline } from './style-toggles';
import { extensionMap } from '../utils/constants';

interface Props {
  editor: Editor;
}

const BubbleMenu = (props: Props) => {
  const { editor } = props;

  const activeExtensions = getActiveExtensions(editor);

  return (
    <TiptapBubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className='bg-background text-foreground'>
      <div className='border shadow-md p-1 rounded-md bg-background text-foreground'>
        {activeExtensions[extensionMap.bold] ? <Bold editor={editor} /> : null}

        {activeExtensions[extensionMap.italic] ? <Italic editor={editor} /> : null}

        {activeExtensions[extensionMap.strike] ? <Strike editor={editor} /> : null}

        {activeExtensions[extensionMap.underline] ? <Underline editor={editor} /> : null}

        {activeExtensions[extensionMap.horizontalRule] ? <Divider editor={editor} /> : null}

        {activeExtensions[extensionMap.extractor] ? <Extractor editor={editor} /> : null}
      </div>
    </TiptapBubbleMenu>
  );
};

export default BubbleMenu;
