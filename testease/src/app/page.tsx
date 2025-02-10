'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Box, LogOut, Menu, Network, Play, Plus, Puzzle, User } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { signOut, useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import wretch from 'wretch';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/ui/loading/loading-overlay';
import { SolarSystem } from '@/components/ui/loading/solar-system';

export default function page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const images = [
    { img: '/img/chatgpt.jpg', name: 'GPT' },
    { img: '/img/gemini.png', name: 'Gemini AI' },
    { img: '/img/llama.png', name: 'LLama' },
    { img: '/img/mistral.jpeg', name: 'Mistral AI' }
  ];
  const user = session?.user;

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await wretch('/api/access/logout').post().json();
      await signOut();
      toast({
        variant: 'success',
        title: 'Log out successfully'
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Log out failed',
        description: error?.json?.message || 'An unexpected error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className='flex flex-col gap-36 min-h-[100vh] overflow-hidden relative'>
        <div className='absolute h-[1460px] w-full top-0 left-0 right-0 z-[-1]'>
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 0.6 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className='absolute left-0 w-[40%] aspect-[0.5/1] '
          >
            <Image
              src={'/svg/leftbg.svg'}
              alt='leftbg'
              width={1045}
              height={490}
              className='w-full h-auto scale-x-[-1] scale-y-[-1]'
            />
          </motion.div>

          {/* Bottom Image (enters from the right) */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 0.6 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className='absolute right-0 -top-20 w-[40%] aspect-[0.5/1]'
          >
            <Image src={'/svg/leftbg.svg'} alt='leftbg' width={1045} height={490} className='w-full h-auto' />
          </motion.div>
        </div>
        <header className='w-full z-20'>
          <nav className='container sticky top-0 h-28 flex flex-col justify-center'>
            <div className='flex justify-between items-center h-12'>
              <div className='flex items-center gap-2'>
                <Image src={'/img/logo.png'} width={24} height={24} alt='logo' className='w-8 h-8' />
                <p className='font-semibold text-2xl font-sans tracking-wider'>Testease</p>
              </div>
              <div className='flex items-center gap-2'>
                <Link href='#'>
                  <Button variant='ghost' size='lg' className='text-[#ADADAD] text-lg rounded-full'>
                    Features
                  </Button>
                </Link>
                <Link href='#'>
                  <Button variant='ghost' size='lg' className='text-[#ADADAD] text-lg rounded-full'>
                    Pricing
                  </Button>
                </Link>
                <Link href='#'>
                  <Button variant='ghost' size='lg' className='text-[#ADADAD] text-lg rounded-full'>
                    Contact
                  </Button>
                </Link>
              </div>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className='cursor-pointer'>
                    <Avatar className='h-8 w-8 rounded-full'>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className='rounded-full bg-primary text-primary-foreground'>PH</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={10} align='end'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => router.push('/all-project')}
                        className='flex items-center cursor-pointer'
                      >
                        <Menu />
                        <span>Project Explorer</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className='flex items-center cursor-pointer'>
                        <User />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className='flex items-center cursor-pointer'>
                      <LogOut />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href={'/login'}>
                  <Button
                    className='bg-foreground text-background font-bold text-xl rounded-full hover:text-primary-foreground py-6'
                    size='lg'
                  >
                    Log In
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <section className='container flex items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            className='text-center'
          >
            <Button variant='outline' className='rounded-full text-lg py-4 px-6 border mb-2'>
              Elevate your testing journey!
            </Button>
            <h1 className='text-5xl font-bold leading-relaxed'>AI Writes The Test Cases, </h1>
            <h1 className='text-5xl font-bold'>You Call The Shots!</h1>
            <p className='text-lg mt-4 opacity-80'>No more stress, test with ease</p>
            <div className='flex items-center justify-center gap-4 mt-6'>
              <Button
                className='bg-foreground text-background font-bold text-xl rounded-full hover:text-primary-foreground py-6'
                size='lg'
              >
                Start for free
              </Button>
              <Button variant='outline' size='lg' className='font-bold text-xl rounded-full py-6'>
                <Play className='fill-foreground' /> Watch Video
              </Button>
            </div>
          </motion.div>
        </section>
        <section className='container flex items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ rotateX: 10 }}
            className='p-4 border rounded-2xl w-full bg-background cursor-pointer'
          >
            <Image
              src={'/img/screenshot.JPG'}
              alt='screenshot'
              width={1200}
              height={561}
              className='w-full aspect-auto rounded-lg border-none'
            ></Image>
          </motion.div>
        </section>
        <section className='container flex flex-col items-center justify-center gap-12'>
          <h1 className='text-[#ADADAD] text-3xl font-semibold'>Feature several LLMs</h1>
          <motion.div
            initial={{ scale: 0.6, opacity: 0.1 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='w-full'
          >
            <Carousel
              opts={{ align: 'start', loop: true, duration: 2000 }}
              plugins={[Autoplay({ delay: 1000 })]}
              className='relative w-full'
            >
              <CarouselContent className='w-full'>
                {[...images, ...images].map((src, index) => (
                  <CarouselItem key={index} className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
                    <div
                      key={index}
                      className='flex sm:flex-col items-center gap-2 justify-center bg-muted/30 rounded-2xl py-6'
                    >
                      <Image
                        src={src.img}
                        alt={`slide-${index}`}
                        width={100}
                        height={50}
                        className='rounded-lg shadow-lg h-14 w-auto'
                      />
                      <div className='text-muted-foreground text-lg font-semibold'>{src.name}</div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        </section>
        <section className='container flex flex-col justify-center items-center gap-12'>
          <div className='flex flex-col justify-center items-center gap-3'>
            <h3 className='text-sidebar-active font-medium text-2xl'>Introducing Testease</h3>
            <h1 className='font-bold tracking-wider text-6xl text-center'>Test with ease.</h1>
          </div>
          <Tabs defaultValue='blackbox' className='w-full border rounded-3xl h-auto p-8'>
            <TabsList className='grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-x-2 lg:grid-cols-3 lg:gap-x-3 p-3 bg-muted/30 h-auto rounded-3xl '>
              <TabsTrigger
                value='blackbox'
                className='data-[state=active]:bg-foreground data-[state=active]:text-background py-3 rounded-2xl text-xl font-semibold data-[state=inactive]:hover:bg-muted'
              >
                Blackbox Testing
              </TabsTrigger>
              <TabsTrigger
                value='unit'
                className='data-[state=active]:bg-foreground data-[state=active]:text-background py-3 rounded-2xl text-xl font-semibold data-[state=inactive]:hover:bg-muted'
              >
                Unit Testing
              </TabsTrigger>
              <TabsTrigger
                value='api'
                className='data-[state=active]:bg-foreground data-[state=active]:text-background py-3 rounded-2xl text-xl font-semibold data-[state=inactive]:hover:bg-muted'
              >
                API Testing
              </TabsTrigger>
            </TabsList>
            <TabsContent value='blackbox' className='mt-8'>
              <div className='w-full flex flex-col lg:flex-row gap-8'>
                <motion.div className='basis-2/3 rounded-3xl flex justify-center items-center relative'>
                  <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-70% via-transparent to-black  rounded-3xl' />
                  <Image
                    src={'/img/screenshot.JPG'}
                    alt='blackbox'
                    width={800}
                    height={400}
                    className='w-full h-full rounded-3xl'
                  />
                </motion.div>
                <motion.div className='basis-1/3 p-8 flex flex-col gap-4 bg-muted/30 rounded-3xl'>
                  <div className='w-20 h-20 rounded-full flex justify-center items-center bg-background relative shadow-xl overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full' />
                    <Box size={44} className='text-sidebar-active relative z-10' />
                  </div>
                  <h1 className='font-bold text-2xl'>Blackbox Testing</h1>
                  <p className='text-foreground/70'>
                    Introducing Blackbox Testing – an AI-powered tool that generates test cases automatically from your
                    use case input. Save time and improve accuracy by letting AI identify edge cases and validate your
                    software, ensuring a seamless, bug-free experience.{' '}
                  </p>
                  <Link href={'#'} className='pt-6 flex items-center text-sidebar-active text-lg gap-1'>
                    Learn More <ArrowRight />
                  </Link>
                </motion.div>
              </div>
            </TabsContent>
            <TabsContent value='unit' className='mt-8'>
              <div className='w-full flex flex-col lg:flex-row gap-8'>
                <motion.div className='basis-2/3 rounded-3xl flex justify-center items-center relative'>
                  <motion.div className='absolute inset-0 bg-gradient-to-br from-white/10 via-70% via-transparent to-black  rounded-3xl' />
                  <Image
                    src={'/img/screenshot.JPG'}
                    alt='blackbox'
                    width={800}
                    height={400}
                    className='w-full h-auto rounded-3xl'
                  />
                </motion.div>
                <motion.div className='basis-1/3 p-8 flex flex-col gap-4 bg-muted/30 rounded-3xl'>
                  <div className='w-20 h-20 rounded-full flex justify-center items-center bg-background relative shadow-xl overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full' />
                    <Puzzle size={44} className='text-sidebar-active relative z-10' />
                  </div>
                  <h1 className='font-bold text-2xl'>Unit Testing</h1>
                  <p className='text-foreground/70'>
                    Introducing Blackbox Testing – an AI-powered tool that generates test cases automatically from your
                    use case input. Save time and improve accuracy by letting AI identify edge cases and validate your
                    software, ensuring a seamless, bug-free experience.{' '}
                  </p>
                  <Link href={'#'} className='pt-6 flex items-center text-sidebar-active text-lg gap-1'>
                    Learn More <ArrowRight />
                  </Link>
                </motion.div>
              </div>
            </TabsContent>
            <TabsContent value='api' className='mt-8'>
              <div className='w-full flex flex-col lg:flex-row gap-8'>
                <motion.div className='basis-2/3 rounded-3xl flex justify-center items-center relative'>
                  <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-70% via-transparent to-black  rounded-3xl' />
                  <Image
                    src={'/img/screenshot.JPG'}
                    alt='blackbox'
                    width={800}
                    height={400}
                    className='w-full h-auto rounded-3xl'
                  />
                </motion.div>
                <motion.div className='basis-1/3 p-8 flex flex-col gap-4 bg-muted/30 rounded-3xl'>
                  <div className='w-20 h-20 rounded-full flex justify-center items-center bg-background relative shadow-xl overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full' />
                    <Network size={44} className='text-sidebar-active relative z-10' />
                  </div>
                  <h1 className='font-bold text-2xl'>API Testing</h1>
                  <p className='text-foreground/70'>
                    Introducing Blackbox Testing – an AI-powered tool that generates test cases automatically from your
                    use case input. Save time and improve accuracy by letting AI identify edge cases and validate your
                    software, ensuring a seamless, bug-free experience.{' '}
                  </p>
                  <Link href={'#'} className='pt-6 flex items-center text-sidebar-active text-lg gap-1'>
                    Learn More <ArrowRight />
                  </Link>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
        <section className='container flex flex-col justify-center items-center'>
          <h3 className='text-sidebar-active font-semibold text-2xl'>FAQ</h3>
          <h1 className='mt-2 text-6xl font-semibold text-center'>Have any questions?</h1>
          <p className='mt-4 text-foreground/70 text-center font-medium'>
            Your burning questions, answered swiftly and succinctly.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            className='w-[80%] lg:w-[45%] flex flex-start flex-col gap-5 mt-12'
          >
            <Collapsible className='w-full pl-6 pr-4 py-4 bg-muted/30 rounded-2xl cursor-pointer hover:bg-muted/50'>
              <CollapsibleTrigger asChild>
                <div className='flex items-center justify-between'>
                  <p className='font-medium'>What is Testease?</p>
                  <Button variant='ghost' size='icon' className='rounded-full bg-muted'>
                    <Plus className='h-10 w-10' />
                  </Button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className='text-foreground/70 pt-3'>
                Testease is a Testing tool using various AI models to automate your testing process by generating your
                test cases with AI
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='w-full pl-6 pr-4 py-4 bg-muted/30 rounded-2xl cursor-pointer hover:bg-muted/50'>
              <CollapsibleTrigger asChild>
                <div className='flex items-center justify-between'>
                  <p className='font-medium'>How do Testease conduct blackbox test?</p>
                  <Button variant='ghost' size='icon' className='rounded-full bg-muted'>
                    <Plus className='h-10 w-10' />
                  </Button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className='text-foreground/70 pt-3'>
                Testease is a Testing tool using various AI models to automate your testing process by generating your
                test cases with AI
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='w-full pl-6 pr-4 py-4 bg-muted/30 rounded-2xl cursor-pointer hover:bg-muted/50'>
              <CollapsibleTrigger asChild>
                <div className='flex items-center justify-between'>
                  <p className='font-medium'>Where is Unit Testing and API testing?</p>
                  <Button variant='ghost' size='icon' className='rounded-full bg-muted'>
                    <Plus className='h-10 w-10' />
                  </Button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className='text-foreground/70 pt-3'>
                Testease is a Testing tool using various AI models to automate your testing process by generating your
                test cases with AI
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='w-full pl-6 pr-4 py-4 bg-muted/30 rounded-2xl cursor-pointer hover:bg-muted/50'>
              <CollapsibleTrigger asChild>
                <div className='flex items-center justify-between'>
                  <p className='font-medium'>How trustful is Testease?</p>
                  <Button variant='ghost' size='icon' className='rounded-full bg-muted'>
                    <Plus className='h-10 w-10' />
                  </Button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className='text-foreground/70 pt-3'>
                Testease is a Testing tool using various AI models to automate your testing process by generating your
                test cases with AI
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
        </section>
        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
          className='container bg-muted/30 pt-24 rounded-3xl mb-8 flex justify-center'
        >
          <div className='lg:max-w-[80%] flex flex-col items-center gap-24'>
            <div className='flex flex-col lg:flex-row md:flex-row justify-between items-start gap-12'>
              <div className='basis-2/4 flex flex-col gap-6'>
                <div className='flex items-center gap-2'>
                  <Image src={'/img/logo.png'} width={24} height={24} alt='logo' className='w-8 h-8' />
                  <p className='font-semibold text-2xl font-sans tracking-wider'>Testease</p>
                </div>
                <p className='text-foreground/50'>
                  Testease is an AI-powered tool designed for testers to effortlessly generate test cases. Supporting
                  blackbox testing, unit testing, and API testing, it enhances efficiency, reduces manual effort, and
                  ensures comprehensive test coverage, so you can test smarter, not harder.
                </p>
              </div>
              <div className='basis-2/4 flex justify-between w-full'>
                <div className='flex flex-col gap-4'>
                  <h1 className='mb-2 text-foreground/50 text-lg'>Product</h1>
                  <p>Feature</p>
                  <p>Pricing</p>
                </div>
                <div className='flex flex-col gap-4'>
                  <h1 className='mb-2 text-foreground/50 text-lg'>Company</h1>
                  <p>Contact</p>
                </div>
                <div className='flex flex-col gap-4'>
                  <h1 className='mb-2 text-foreground/50 text-lg'>Pages</h1>
                  <p>Term & Condition</p>
                </div>
              </div>
            </div>
            <div className='w-full flex flex-col'>
              <Separator />
              <div className='py-12 text-center'>©2025 Testease. All rights reserved.</div>
            </div>
          </div>
        </motion.footer>
      </div>
      {isLoading && <LoadingOverlay spinner={<SolarSystem />} />}
    </>
  );
}
