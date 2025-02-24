import { Extension } from '@tiptap/core';

export interface ExtractorOptions {
  /**
   * The wrapping character(s).
   * @default '%#%--------%#%'
   */
  wrapCharacter: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    wrapText: {
      /**
       * Wrap the selected content in a character.
       * @param wrapCharacter The character(s) to wrap around the selected text.
       * @example editor.commands.wrapWithCharacter('%#%--------%#%')
       */
      wrapWithCharacter: (wrapCharacter?: string) => ReturnType;
      /**
       * Unwrap the selected content.
       * @example editor.commands.unwrapFromCharacter()
       */
      unwrapFromCharacter: (wrapCharacter?: string) => ReturnType;
    };
  }
}

export const Extractor = Extension.create<ExtractorOptions>({
  name: 'extractor',

  addOptions() {
    return {
      wrapCharacter: '%#%--------%#%'
    };
  },

  addCommands() {
    return {
      wrapWithCharacter:
        () =>
        ({ state, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;
          const resolvedWrapCharacter = this.options.wrapCharacter;

          if (from === to) {
            console.warn('No text selected to wrap.');
            return false;
          }

          // Extract the selected text as plain text
          const selectedText = state.doc.textBetween(from, to, ' ');

          // Wrap the plain text with the specified character(s)
          const wrappedText = `${resolvedWrapCharacter}${selectedText}${resolvedWrapCharacter}\n`;

          if (dispatch) {
            // Replace the entire selection with the wrapped text
            dispatch(state.tr.insertText(wrappedText, from, to));
          }

          return true;
        },

      unwrapFromCharacter:
        () =>
        ({ state, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;
          const resolvedWrapCharacter = this.options.wrapCharacter;

          if (from === to) {
            console.warn('No text selected to unwrap.');
            return false;
          }

          // Extract the selected text as plain text
          const selectedText = state.doc.textBetween(from, to, ' ');

          // Check if the selected text is wrapped with the specified character
          if (selectedText.startsWith(resolvedWrapCharacter) && selectedText.endsWith(resolvedWrapCharacter)) {
            // Remove the wrapping characters
            const unwrappedText = selectedText.slice(resolvedWrapCharacter.length, -resolvedWrapCharacter.length);

            if (dispatch) {
              // Replace the entire selection with the unwrapped text
              dispatch(state.tr.insertText(unwrappedText, from, to));
            }

            return true;
          }

          console.warn('Selected text is not wrapped with the specified character.');
          return false;
        }
    };
  }
});
