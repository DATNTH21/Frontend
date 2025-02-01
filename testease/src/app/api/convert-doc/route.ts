// import { NextApiRequest, NextApiResponse } from 'next';
// import path from 'path';
// import fs from 'fs';
// import { exec } from 'child_process';

// // This API route receives a .doc file, converts it to .docx, and returns the .docx file to the client
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   const file = req.body.file;
//   if (!file) {
//     return res.status(400).json({ error: 'No file provided' });
//   }

//   // Save the file temporarily
//   const tempFilePath = path.join(process.cwd(), 'tmp', 'temp.doc');
//   const tempDocxPath = path.join(process.cwd(), 'tmp', 'temp.docx');

//   try {
//     const fileBuffer = Buffer.from(await file.arrayBuffer());
//     fs.writeFileSync(tempFilePath, fileBuffer);

//     // Convert the .doc file to .docx using LibreOffice
//     exec(`libreoffice --headless --convert-to docx --outdir ${path.dirname(tempDocxPath)} ${tempFilePath}`, (err, stdout, stderr) => {
//       if (err) {
//         console.error('Error converting file:', stderr);
//         return res.status(500).json({ error: 'Conversion failed' });
//       }

//       // Send the converted .docx file back to the client
//       const convertedFile = fs.readFileSync(tempDocxPath);
//       res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
//       res.setHeader('Content-Disposition', 'attachment; filename="converted.docx"');
//       res.send(convertedFile);

//       // Clean up temporary files
//       fs.unlinkSync(tempFilePath);
//       fs.unlinkSync(tempDocxPath);
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
