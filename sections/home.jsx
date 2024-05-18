import Navbar from '@/components/Navbar'
// import bastaNavbar from '@/components/bastaNavbar'
import Section from '@/components/Section'
import Image from 'next/image'
import Link from 'next/link'
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Home = ({cardLength}) => {
    const [text] = useTypewriter({
      words: [
        "Your trusted Shopping Platform.",
        "Providing best user experience for customers.",
        "Delivery on time in demand.",
      ],
      loop: true,
      typeSpeed: 30,
      deleteSpeed: 10,
      delaySpeed: 2000,
    });

  return (
    <Section id="home">
        <div className="top-0 left-0 h-full w-full">
            <Image src="/image/bg.jpg"  alt="background" fill className="object-cover" />
        </div>
       <Navbar cardLength={cardLength}/>
       {/* <bastaNavbar/> */}

        <div className="relative h-[70vh] z-[1] flex justify-center items-center">
            <div className="flex flex-col justify-center items-center text-center  text-tahiti">
                <h1 className="text-5xl">COFFEE FIRST - CALBAYOG</h1>
                <p className="text-base md:text-lg font-semibold mt-2">
                    {text} <Cursor cursorBlinking cursorStyle="|" cursorColor="#ffaa17" />
                </p>
                <Link href="#IcedCoffee" scroll={false} className="mt-5 bg-gray px-[2rem] py-[8px] rounded-xl scroll-smoth">
                    <p className="font-semibold tracking-wider">MENU</p>
                </Link>

            </div>
        </div>
    </Section>
  )
}

export default Home