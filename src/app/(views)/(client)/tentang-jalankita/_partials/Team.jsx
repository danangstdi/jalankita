import Image from "next/image";
import Danang from '@/../public/img/danang.webp'
import Sacha from '@/../public/img/sacha.webp'
import Jevan from '@/../public/img/jevan.webp'
import Willy from '@/../public/img/willy.webp'

export default function Team() {
  const devs = [
    {
      photo: Jevan,
      name: 'I Made Jevan Nandayana',
      role: 'UI/UX Designer'
    },
    {
      photo: Danang,
      name: 'Danang Setiadi',
      role: 'Fullstack Developer'
    },
    {
      photo: Sacha,
      name: 'Sacha Ahsan Firmansyah',
      role: 'Frontend Developer | UI/UX Designer'
    },
    {
      photo: Willy,
      name: 'Willybrodus Stephanus Da Costa',
      role: 'Frontend Developer'
    },
  ]
  return (
    <section className='mt-[10rem]'>
      <h2 className='poppins-bold text-3xl px-4 mb-8  mt-4 md:mx-20 text-center'>
        Tim Kami
      </h2>
      <ul className='grid grid-cols-2 gap-y-6 md:grid-cols-4 lg:px-32 lg:gap-0'>
        {devs.map((dev) => (
          <li key={dev.name} className='flex flex-col justify-center items-center'>
            <Image src={dev.photo} quality={25} loading="lazy" alt={`Foto ${dev.name}`} className='h-24 w-24 overflow-hidden rounded-full shadow-xl lg:h-36 lg:w-36'/>
            <p className="text-xs text-center mt-3 font-semibold lg:mt-6 lg:text-sm">{dev.name}</p>
            <p className="text-xs text-center text-indigo-600 font-semibold lg:text-sm">{dev.role}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
