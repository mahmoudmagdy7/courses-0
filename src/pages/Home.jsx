import { Button } from '@nextui-org/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {



  return <>

    <main className=' max-w-screen-xl m-auto  h-screen '>

      <section className='md-flex-col gap-4 md:flex md-justify-center md:justify-evenly items-center md:px-16 text-center px-2  h-screen '>

        <div className=' my-16'>

          <h1 className='md:text-7xl text-5xl font-semibold mb-5 ct-primary'>ملك الفيزياء</h1>
          <p className='md:text-3xl text-2xl ct-1'>
            #درجات_الفيزياء_فى_جيبك
          </p>
          <Button as={Link} href='/auth/signup' className="w-1/2 mt-10 cbg-primary ct-5 cbg-primary-hover rounded-lg text-md disabled:opacity-40">
            <span>تسجيل حساب</span>
          </Button>

        </div>
        <figure className='text-center'>
          <img src="/assets/images/hero-image.png" alt="main logo" className='w-full ' />
        </figure>
      </section>
    </main>


  </>
}
