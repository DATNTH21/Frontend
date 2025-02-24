import { Editor } from '@tiptap/react';
import { Toggle } from '@/components/ui/toggle';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Level } from '../utils/editor.type';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDown,
  ItalicIcon,
  List,
  ListCheck,
  ListOrdered,
  Minus,
  RedoIcon,
  Strikethrough,
  Type,
  UnderlineIcon,
  UndoIcon,
  WrapText
} from 'lucide-react';
import { Button } from '../../button';
import { Tooltip, TooltipTrigger, TooltipContent } from '../../tooltip';

const getActiveProps = (isActive = false) => {
  const activeProps = {
    'aria-pressed': false,
    'data-state': 'off'
  };

  if (isActive) {
    activeProps['aria-pressed'] = true;
    activeProps['data-state'] = 'on';
  }

  return activeProps;
};

export const Bold = ({ editor }: { editor: Editor }) => (
  <Toggle onClick={() => editor.chain().focus().toggleBold().run()} {...getActiveProps(editor.isActive('bold'))}>
    <BoldIcon size={16} />
  </Toggle>
);

export const Italic = ({ editor }: { editor: Editor }) => (
  <Toggle onClick={() => editor.chain().focus().toggleItalic().run()} {...getActiveProps(editor.isActive('italic'))}>
    <ItalicIcon size={16} />
  </Toggle>
);

export const Strike = ({ editor }: { editor: Editor }) => (
  <Toggle onClick={() => editor.chain().focus().toggleStrike().run()} {...getActiveProps(editor.isActive('strike'))}>
    <Strikethrough size={16} />
  </Toggle>
);

export const Text = ({ editor }: { editor: Editor }) => (
  <Toggle onClick={() => editor.chain().focus().setParagraph().run()} aria-pressed={false} data-state='off'>
    <Type size={16} />
  </Toggle>
);

const levels: Level[] = [1, 2, 3];

export const Heading = ({ editor }: { editor: Editor }) => {
  const activeHeading = levels.find((level) => editor?.isActive('heading', { level }));

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className='font-normal w-32 flex items-center justify-between'>
          <div>{activeHeading ? <>Heading {activeHeading}</> : <>Text</>}</div>
          <ChevronDown size={14} />
        </MenubarTrigger>

        <MenubarContent>
          <MenubarItem onClick={() => editor.chain().focus().setParagraph().run()}>Text</MenubarItem>

          {levels.map((level) => (
            <MenubarItem key={`level-${level}`} onClick={() => editor.chain().focus().toggleHeading({ level }).run()}>
              Heading {level}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export const BulletList = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().toggleBulletList().run()}
    {...getActiveProps(editor.isActive('bulletList'))}
  >
    <List size={16} />
  </Toggle>
);

export const OrderedList = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().toggleOrderedList().run()}
    {...getActiveProps(editor.isActive('orderedList'))}
  >
    <ListOrdered size={16} />
  </Toggle>
);

export const Divider = ({ editor }: { editor: Editor }) => (
  <Toggle onClick={() => editor.chain().focus().setHorizontalRule().run()} aria-pressed={false} data-state='off'>
    <Minus size={16} />
  </Toggle>
);

export const TodoList = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().toggleTaskList().run()}
    {...getActiveProps(editor.isActive('taskList'))}
  >
    <ListCheck size={16} />
  </Toggle>
);

export const Underline = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().toggleUnderline().run()}
    {...getActiveProps(editor.isActive('underline'))}
  >
    <UnderlineIcon size={16} />
  </Toggle>
);

const alignOptions = ['left', 'right', 'center'] as const;

const textAlignMap: Record<(typeof alignOptions)[number], JSX.Element> = {
  left: <AlignLeftIcon size={16} />,
  right: <AlignRightIcon size={16} />,
  center: <AlignCenterIcon size={16} />
};

export const TextAlign = ({ editor }: { editor: Editor }) => {
  const activeAlignment = alignOptions.find((option) => editor.isActive({ textAlign: option }));

  const icon = activeAlignment ? textAlignMap[activeAlignment] : textAlignMap.left;

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className='w-24 flex items-center justify-between'>
          {icon}
          <ChevronDown size={14} />
        </MenubarTrigger>
        <MenubarContent>
          {alignOptions.map((option) => (
            <MenubarItem
              key={`align-${option}`}
              className='capitalize'
              onClick={() => editor.chain().focus().setTextAlign(option).run()}
            >
              {option} Align
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export const Extractor = ({ editor }: { editor: Editor }) => {
  const wrapCharacter = editor.extensionManager.extensions.find((ext) => ext.name === 'extractor')?.options
    .wrapCharacter as string;

  if (!wrapCharacter) {
    console.error('Extractor extension is not configured with a wrapCharacter.');
    return null;
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className='bg-gradient-to-tl from-indigo-500 to-fuchsia-500 transition-colors hover:scale-105'
          size='icon'
          onClick={() => {
            const isWrapped =
              editor.state.doc
                .textBetween(editor.state.selection.from, editor.state.selection.to, ' ')
                .startsWith(wrapCharacter) &&
              editor.state.doc
                .textBetween(editor.state.selection.from, editor.state.selection.to, ' ')
                .endsWith(wrapCharacter);

            if (isWrapped) {
              editor.chain().focus().unwrapFromCharacter(wrapCharacter).run();
            } else {
              editor.chain().focus().wrapWithCharacter(wrapCharacter).run();
            }
          }}
        >
          <WrapText size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Extract use case</TooltipContent>
    </Tooltip>
  );
};

export const Undo = ({ editor }: { editor: Editor }) => {
  return (
    <Button onClick={() => editor.chain().focus().undo().run()} size='icon' variant='ghost'>
      <UndoIcon size={16} />
    </Button>
  );
};

export const Redo = ({ editor }: { editor: Editor }) => {
  return (
    <Button onClick={() => editor.chain().focus().redo().run()} size='icon' variant='ghost'>
      <RedoIcon size={16} />
    </Button>
  );
};
