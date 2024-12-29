import { bold as roboto_bold, regular as roboto_regular, italic as  roboto_italic, italic as roboto_bold_italic  } from '@/assets/fonts/Roboto'
export const Roboto = {
	normal: Buffer.from(roboto_regular, 'base64'),
	bold: Buffer.from(roboto_bold, 'base64'),
	italics: Buffer.from(roboto_italic, 'base64'),
	bolditalics: Buffer.from(roboto_bold_italic, 'base64')
}


