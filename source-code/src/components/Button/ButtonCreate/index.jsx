'use client'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

const ButtonCreate = () => {
  const router = useRouter()
  const pathname = usePathname()
  console.log(pathname)
  return (
    <>
    
    <Button type="primary" style={{marginBottom:"10px"}} icon={<PlusOutlined />} 
        onClick={() => {
          router.push(pathname + '/create')
        }}
        >Create</Button>
    </>
  )
}

export default ButtonCreate