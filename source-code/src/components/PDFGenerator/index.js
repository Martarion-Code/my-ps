import PdfPrinter from 'pdfmake'
// import { Roboto, TimeNewRoman } from './fonts'

export const createPdf = async ({ template }) => {
	const printer = new PdfPrinter()
	const pdfDoc = printer.createPdfKitDocument(template)
	return new Promise((resolve, reject) => {
		try {
			const chunks = []
			pdfDoc.on('data', (chunk) => chunks.push(chunk))
			pdfDoc.on('end', () => resolve(Buffer.concat(chunks)))
			pdfDoc.end()
		} catch (err) {
			reject(err)
		}
	})
}

export const errorPdfHtmlTemplate = (status, error) =>
	`<body style=margin:0;padding:0;display:flex;justify-content:center;align-items:center;flex-direction:column;min-height:100%><h2>There was an error displaying the PDF document.</h2><pre style=background-color:#eaeaea;padding:.8rem;border-radius:.4rem>${status}</pre><pre style=background-color:#eaeaea;padding:.8rem;border-radius:.4rem>Error message: ${error}</pre>`
