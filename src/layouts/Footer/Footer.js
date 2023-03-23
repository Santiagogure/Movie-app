import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AiOutlineGithub, AiOutlineLinkedin } from 'react-icons/ai'

function redirect(url) {
  window.location = url
}

const footer = [
  {
    title: 'Gure Movies',
    services: ['Streaming', 'Downloads', 'Recommendations', 'Ratings'],
  },
  {
    title: 'Our Partners',
    services: [
      'Advertising',
      'Sponsorships',
      'Promotions',
      'Product Placement',
    ],
  },
  {
    title: 'Connect With Us',
    services: ['Facebook', 'Twitter', 'Instagram', 'YouTube'],
  },
  {
    title: 'Customer Support',
    services: ['FAQ', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
  },
  {
    title: 'About Us',
    services: ['Mission Statement', 'History', 'Team Members', 'Jobs'],
  },
]

const Footer = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
  }, [])

  setTimeout(() => {
    setLoading(false)
  }, 1600)

  if (loading) {
    return <></>
  }
  return (
    <>
      <footer className=" text-white lg:mt-64">
        <div
          className="cursor-pointer bg-tertiary py-4 text-center"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }}
        >
          <button>BACK TO TOP</button>
        </div>
        <div className="border-b border-tertiary bg-secondary">
          <div className="mx-auto max-w-[105rem] px-3">
            <div className="grid grid-cols-1 lg:ml-16  gap-4 px-4  py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {footer.map((col, i) => (
                <div key={i}>
                  <h3 className="mb-10 text-xl font-medium">{col.title}</h3>
                  <ul className="flex flex-col gap-2">
                    {col.services.map((link, i) => (
                      <li key={i}>
                        <Link
                          to="/"
                          className="text-sm transition-all hover:text-blue-600"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-20 bg-secondary py-12">
          <div>
            <div className="flex items-center justify-center space-x-5">
              <AiOutlineLinkedin
                className="cursor-pointer"
                onClick={() =>
                  redirect('https://www.linkedin.com/in/santiago-gurevich/')
                }
                size={'2rem'}
              />
              <AiOutlineGithub
                className="cursor-pointer"
                onClick={() => redirect('https://github.com/Santiagogure')}
                size={'2rem'}
              />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[105rem] px-3">
          <div className="flex items-center justify-between py-4">
            <div>GurevichSantiago@gmail.com</div>
            <div>Copyright © 2023 Santiago Gurevich</div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
