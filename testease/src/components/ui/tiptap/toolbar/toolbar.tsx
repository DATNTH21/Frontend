import { Editor } from '@tiptap/core'; // Adjust according to your setup
import {
  Bold,
  BulletList,
  Divider,
  Heading,
  Italic,
  OrderedList,
  Strike,
  Text,
  TextAlign,
  TodoList,
  Underline,
  Extractor,
  Undo,
  Redo
} from './style-toggles';
import { extensionMap } from '../utils/constants';
import { getActiveExtensions } from '../utils/helpers';

interface Props {
  editor: Editor;
}

const Toolbar = (props: Props) => {
  const { editor } = props;

  const activeExtensions = getActiveExtensions(editor);

  return (
    <div className='sticky bg-background text-foreground z-50'>
      <div className='border flex-wrap rounded-lg p-1 flex items-center gap-2'>
        {activeExtensions[extensionMap.heading] ? <Undo editor={editor} /> : null}

        {activeExtensions[extensionMap.heading] ? <Redo editor={editor} /> : null}

        {activeExtensions[extensionMap.extractor] ? <Extractor editor={editor} /> : null}

        {activeExtensions[extensionMap.heading] ? <Heading editor={editor} /> : null}

        {activeExtensions[extensionMap.bold] ? <Bold editor={editor} /> : null}

        {activeExtensions[extensionMap.italic] ? <Italic editor={editor} /> : null}

        {activeExtensions[extensionMap.paragraph] ? <Text editor={editor} /> : null}

        {activeExtensions[extensionMap.strike] ? <Strike editor={editor} /> : null}

        {activeExtensions[extensionMap.underline] ? <Underline editor={editor} /> : null}

        {activeExtensions[extensionMap.bulletList] ? <BulletList editor={editor} /> : null}

        {activeExtensions[extensionMap.orderedList] ? <OrderedList editor={editor} /> : null}

        {activeExtensions[extensionMap.taskList] ? <TodoList editor={editor} /> : null}

        {activeExtensions[extensionMap.horizontalRule] ? <Divider editor={editor} /> : null}

        {activeExtensions[extensionMap.textAlign] ? <TextAlign editor={editor} /> : null}
      </div>
    </div>
  );
};

export default Toolbar;
