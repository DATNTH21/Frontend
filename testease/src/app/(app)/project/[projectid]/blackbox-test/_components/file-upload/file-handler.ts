'use client';
import mammoth from 'mammoth';
import pdfToText from 'react-pdftotext';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export const readFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        if (file.type === 'application/pdf') {
          // Handle PDF files
          // const arrayBuffer = reader.result as ArrayBuffer;
          const pdfHtml = await handlePdfFile(file);
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
  const result = await mammoth.extractRawText({ arrayBuffer });
  return `<div>${result.value}</div>`;
};

const handlePdfFile = async (file: File): Promise<string> => {
  // const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  // const totalPages = pdf.numPages;
  // let pdfText = '';

  // for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
  //   const page = await pdf.getPage(pageNum);
  //   const textContent = await page.getTextContent();
  //   const pageText = textContent.items.map((item: any) => item.str).join(' ');
  //   pdfText += `<p>${pageText}</p>`;
  // }

  // return `<div>${pdfText}</div>`;

  const text = await pdfToText(file);
  return `<p>${text}</p>`;
};
