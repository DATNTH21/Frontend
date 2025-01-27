export type ExtensionKey =
  | 'undo'
  | 'redo'
  | 'bold'
  | 'italic'
  | 'strike'
  | 'link'
  | 'bulletList'
  | 'orderedList'
  | 'horizontalRule'
  | 'heading'
  | 'paragraph'
  | 'taskList'
  | 'underline'
  | 'textAlign'
  | 'extractor';

export type ExtensionMap = Record<ExtensionKey, ExtensionKey>;

export type Level = 1 | 2 | 3;
