import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <h1 className='font-black text-center text-4xl text-white'>Page Not Founded</h1>
      <p className='mt-10 text-center text-white'>
        Back to {' '}
        <Link to={'/'} className="text-fuchsia-500">Projects</Link>
      </p>
    </>
  )
}
