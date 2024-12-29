'use client'
import { Typography } from 'antd'
import BackButtonIcon from '@/components/Forms/Button/BackButtonIcon'

const { Title } = Typography
const ContentTitle = ({ showBack = false, title = '' }) => {
	return (
		<div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
			{showBack ? <BackButtonIcon /> : <></>}
			<Title level={2} style={{ margin: 0 }}>
				{title}
			</Title>
		</div>
	)
}
export default ContentTitle
