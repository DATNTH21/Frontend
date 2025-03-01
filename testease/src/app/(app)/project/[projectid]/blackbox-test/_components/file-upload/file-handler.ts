'use client';
import mammoth from 'mammoth';
//import pdfToText from 'react-pdftotext';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export const readFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        if (file.type === 'application/pdf') {
          // Handle PDF files
          const arrayBuffer = reader.result as ArrayBuffer;
          const pdfHtml = await handlePdfFile(arrayBuffer);
          resolve(pdfHtml);
        } else if (
          file.type === 'application/msword' ||
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          // Handle .doc/.docx files
          const arrayBuffer = reader.result as ArrayBuffer;
          const docHtml = await handleDocFile(arrayBuffer);
          resolve(docHtml);
        } else if (file.type === 'text/plain') {
          // Handle .txt files
          const plainText = reader.result as string;
          resolve(`<pre>${plainText}</pre>`); // Wrap plain text in <pre> tags for formatting
        } else {
          reject(new Error('Unsupported file type. Only .pdf, .doc, .docx, and .txt are supported.'));
        }
      } catch (error) {
        reject(error);
      }
    };

    if (
      file.type === 'application/pdf' ||
      file.type.startsWith('application/msword') ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  });
};

const handleDocFile = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  const result = await mammoth.convertToHtml({ arrayBuffer });
  return result.value;
};

const handlePdfFile = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  //Using pdfjs-dist
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const totalPages = pdf.numPages;
  let pdfText = '';

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    let lastY: number | undefined;
    let pageText = '';

    for (const item of textContent.items) {
      // Type guard to ensure the item has 'transform' and 'str'
      if ('transform' in item && 'str' in item) {
        if (lastY === item.transform[5] || lastY === undefined) {
          pageText += item.str;
        } else {
          pageText += '\\n<br>' + item.str;
        }
        lastY = item.transform[5];
      }
    }

    // Wrap the page's text in a paragraph
    pdfText += `<p>${pageText}</p>`;
  }

  // Wrap all pages' text in a div
  console.log(pdfText);
  return `<div>${pdfText}</div>`;

  // Using react-pdftotext:
  // const text = await pdfToText(file);
  // console.log('file-handler: pdfText: ', text);
  // return `<p>${text}</p>`;
};
