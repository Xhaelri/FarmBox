import React from 'react'
import Cart from '../_components/cart/Cart'
import { auth } from '../_lib/auth';
import SessionType from '../types/Session';
export default async function page() {
    const session: SessionType | null = await auth();
  
  return (
    <div><Cart session={session}/></div>
  )
}
