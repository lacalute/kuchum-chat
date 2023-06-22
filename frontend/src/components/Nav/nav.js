import './nav.css'

export const Nav = () => {
  return (
    <>
    <div className="nav">
      <img src={require('../../Logo.png')} className='logo' />
      <div className='links'>
        <a className='link' href=''>About</a>
        <a className='link' href=''>GitHub</a>
      </div>
    </div>
    </>
  )
}