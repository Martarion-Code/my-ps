'use client'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

const BackButtonIcon = ({ onClick: _onClick, icon: _icon, type: _type, ...props }) => {
	const router = useRouter()
	return <Button onClick={() => router.back()} icon={<ArrowLeftOutlined />} type="text" {...props} size="large" />
}
export default BackButtonIcon
