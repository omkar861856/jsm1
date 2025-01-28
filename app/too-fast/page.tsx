import React from 'react'

const page = () => {
  return (
    <main className='root-container flex min-h-screen flex-col items-center justify-center'>
        <h1>Too fast</h1>
        <p className='font-bebas-neue text-5xl font-bold text-light-100'>
            You&apos;re going too fast! Please slow down.
        </p>
        <p className='mt-3 max-w-xl text-center text-light-400'>
            You&apos;re making too many requests. Please wait a few seconds before trying again.
        </p>
    </main>
  )
}

export default page