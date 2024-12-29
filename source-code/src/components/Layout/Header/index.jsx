'use client'
import { KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Layout, Popover, Row, Space, message, theme } from 'antd'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
// import axios from 'axios'
import { useEffect, useState } from 'react'
// import { modalError } from '@/utils/modalError'
const { Header } = Layout

const HeaderComponent = () => {
	const {
		token: { colorBgContainer }
	} = theme.useToken()
	const router = useRouter()
	const [messageApi, contextHolder] = message.useMessage()
	const [userData, setUserData] = useState({})

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				// const response = await axios.request({
				// 	method: 'GET',
				// 	url: `/api/profile/get-profile/`,
					
				// })

				// if (response.status === 200) {
				// 	const detail = response.data.data || {}
				// 	setUserData(detail)
				// }
			} catch (error) {
				// modalError(error)
			}
		}

		fetchUserData()
	}, [])
	const barRoute = {
		Username: '/profile',
		'Change Password': '/change-password',
		'Sign Out': '/sign-out'
	}

	const handleCardClick = (title) => {
		const route = barRoute[title]
		if (route) {
			if (title === 'Sign Out') {
				handleLogOut()
			} else {
				router.push(route)
			}
		}
	}

	const handleLogOut = async () => {
		messageApi.open({
			key: 'logout',
			type: 'loading',
			content: 'Logging Out..'
		})

		const baseHost = window.location.origin;
		signOut({ callbackUrl: `${baseHost}` })


		// axios.request({ method: 'POST', url: '/api/auth/logout' }).then(async (res) => {
		// 	messageApi.open({
		// 		key: 'logout',
		// 		type: 'success',
		// 		content: res.data.message,
		// 		duration: 4
		// 	})
		// 	router.replace('/login')
		// })
	}
	const BarCard = ({ route, routeName, icon }) => {
		return (
			<>
				<Card
					className="cards"
					style={{
						width: '100%',
						height: '3rem',
						display: 'flex',
						alignContent: 'center',
						alignItems: 'center',
						fontSize: '15px',
						cursor: 'pointer',
						color: '#374151'
					}}
					onClick={() => handleCardClick(route)}>
					<Space>
						{icon}
						{routeName}
					</Space>
				</Card>
				{contextHolder}
			</>
		)
	}
	const content = (
		<>
			<Row style={{ maxWidth: '300px' }}>
				<Col span={24} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
					<Avatar
						style={{ width: '4rem', height: '4rem' }}
						src={userData?.profile_picture || `https://ui-avatars.com/api/?name=${'userdata.username'}`}
					/>
					<p style={{ fontSize: '18px', fontWeight: 700 }}>{userData?.full_name}</p>
				</Col>
				{/* <Col
					span={24}
					style={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
						marginTop: '1rem',
						marginBottom: '1rem'
					}}>
					<Space direction="vertical">
						<BarCard icon={<UserOutlined style={{ fontSize: '18px' }} />} route="Username" routeName="Profile" />
						<BarCard
							icon={<KeyOutlined style={{ fontSize: '18px' }} />}
							route="Change Password"
							routeName="Change Password"
						/>
						<BarCard icon={<LogoutOutlined style={{ fontSize: '18px' }} />} route="Sign Out" routeName="Sign Out" />
					</Space>
				</Col> */}
			</Row>
		</>
	)
	return (
		<Header
			style={{
				padding: '0.8rem',
				background: colorBgContainer,
				display: 'flex',
				justifyContent: 'flex-end',
				gap: '0.6rem'
			}}>
			{/* <Badge count={150}>
				<Button type="text" shape="circle" icon={<IconRegularBell />} size="large" />
			</Badge> */}

			<Popover
				placement="bottomRight"
				overlayInnerStyle={{ borderRadius: '1rem' }}
				title={null}
				content={content}
				trigger={['click']}>
				<Avatar
					size="large"
					style={{ cursor: 'pointer' }}
					src={userData?.profile_picture || `https://ui-avatars.com/api/?name=${'userdata.username'}`}
				/>
			</Popover>
		</Header>
	)
}

export default HeaderComponent
