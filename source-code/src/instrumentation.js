'use server'
 export const register = async () => {
   if(process.env.NEXT_RUNTIME){
    await import('@/shared/waweb')
  }
}

