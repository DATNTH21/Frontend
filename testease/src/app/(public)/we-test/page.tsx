'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpenCheck, Box, Network, PauseIcon, PlayIcon, Plus, Puzzle } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useEffect, useRef, useState } from 'react';
import { Progress } from '@/components/ui/progress';

export default function Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);

      // Update progress bar
      const updateProgress = () => {
        if (videoRef.current) {
          const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
          setProgress(percent);
        }
      };

      videoRef.current.addEventListener('timeupdate', updateProgress);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return () => videoRef.current?.removeEventListener('timeupdate', updateProgress);
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  return (
    <div className='flex flex-col md:gap-36 gap-24  min-h-[100vh] overflow-hidden relative'>
      <div className='absolute h-screen w-full top-0 left-0 right-0 z-[-1]'></div>

      <section className='pt-16 container flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
          className='text-center'
        >
          <div className='w-fit md:rounded-3xl md:p-4 rounded-lg p-2 mx-auto border border-foreground dark:drop-shadow-[0_0_8px] dark:shadow-primary shadow-inner'>
            <BookOpenCheck className='text-foreground md:text-[42px]' size={24} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='relative md:text-[220px] text-7xl font-bold'
          >
            <span className='relative my-6 z-10 leading-none inline-block'>WeTest</span>
            {/* Reflection */}
            <span className='z-[-1] absolute top-full left-0 w-full md:text-[220px] text-7xl font-bold opacity-30 blur-sm transform scale-y-[-1]'>
              WeTest
            </span>
            {/* Glow Effect */}
            <div className='absolute inset-0 md:text-[220px] text-7xl font-bold dark:bg-primary dark:blur-3xl '></div>
          </motion.div>
          <motion.div className='relative w-fit mx-auto md:px-6 md:py-3 py-2 px-2 font-bold md:text-lg bg-muted rounded-full border-2 border-foreground'>
            A Testease Visual Studio Code Extension
          </motion.div>
          <div className='flex items-center justify-center gap-4 mt-6'>
            <Link href='https://marketplace.visualstudio.com/items?itemName=WeTest.WeTest'>
              <Button
                className='bg-foreground text-background font-bold text-xl rounded-full hover:text-primary-foreground py-6 md:h-10 md:px-8'
                size='sm'
              >
                Go to marketplace
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
      <section className='container flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
          className='w-full bg-background cursor-pointer relative'
        >
          <video ref={videoRef} className='w-full h-full rounded-t-2xl' src='/vid/WeTestGuide.mp4' loop muted />
          <Button size='icon' variant='ghost' className='absolute top-1/2 translate-x-1/2' onClick={togglePlay} asChild>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Progress className='w-full' value={progress} onClick={handleSeek}></Progress>
        </motion.div>
      </section>

      <section className='container flex flex-col justify-center items-center gap-12'>
        <div className='flex flex-col justify-center items-center gap-3'>
          <h3 className='text-sidebar-active font-medium text-2xl'>Introducing WeTest</h3>
          <h1 className='font-bold tracking-wider text-6xl text-center'>An auto generate test case extension</h1>
        </div>
        <Tabs defaultValue='unit' className='w-full border rounded-3xl h-auto p-8'>
          <TabsList className='grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-x-2 lg:grid-cols-3 lg:gap-x-3 p-3 bg-muted dark:bg-muted/30 h-auto rounded-3xl '>
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
            <TabsTrigger
              value='ui'
              className='data-[state=active]:bg-foreground data-[state=active]:text-background py-3 rounded-2xl text-xl font-semibold data-[state=inactive]:hover:bg-muted'
            >
              UI Testing
            </TabsTrigger>
          </TabsList>
          <TabsContent value='unit' className='mt-8'>
            <div className='w-full flex flex-col lg:flex-row gap-8'>
              <motion.div className='basis-2/3 rounded-3xl flex justify-center items-center relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-70% via-transparent to-black  rounded-3xl' />
                <Image
                  src={'/img/features.png'}
                  alt='blackbox'
                  width={800}
                  height={400}
                  className='w-full h-full rounded-3xl'
                />
              </motion.div>
              <motion.div className='basis-1/3 p-8 flex flex-col gap-4 bg-muted dark:bg-muted/30 rounded-3xl'>
                <div className='w-20 h-20 rounded-full flex justify-center items-center bg-background relative shadow-xl overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full' />
                  <Puzzle size={44} className='text-sidebar-active relative z-10' />
                </div>
                <h1 className='font-bold text-2xl'>Unit Testing</h1>
                <p className='text-foreground/70'>
                  A core feature of WeTest extension. Save your time by auto generate unit tests from your code with
                  more than 96% coverage even with complex function, component and algorithm. Unit test also supports
                  auto mocking.{' '}
                </p>
                <Link href={'#'} className='pt-6 flex items-center text-sidebar-active text-lg gap-1 font-medium'>
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
                  src={'/img/features.png'}
                  alt='blackbox'
                  width={800}
                  height={400}
                  className='w-full h-full rounded-3xl'
                />
              </motion.div>
              <motion.div className='basis-1/3 p-8 flex flex-col gap-4 bg-muted dark:bg-muted/30 rounded-3xl'>
                <div className='w-20 h-20 rounded-full flex justify-center items-center bg-background relative shadow-xl overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full' />
                  <Network size={44} className='text-sidebar-active relative z-10' />
                </div>
                <h1 className='font-bold text-2xl'>API Testing</h1>
                <p className='text-foreground/70'>
                  Introducing API Testing - A reliable tool to generate api test cases and execute on the REAL apis.{' '}
                </p>
                <Link href={'#'} className='pt-6 flex items-center text-sidebar-active text-lg gap-1 font-medium'>
                  Learn More <ArrowRight />
                </Link>
              </motion.div>
            </div>
          </TabsContent>
          <TabsContent value='ui' className='mt-8'>
            <div className='w-full flex flex-col lg:flex-row gap-8'>
              <motion.div className='basis-2/3 rounded-3xl flex justify-center items-center relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-70% via-transparent to-black  rounded-3xl' />
                <Image
                  src={'/img/features.png'}
                  alt='blackbox'
                  width={800}
                  height={400}
                  className='w-full h-full rounded-3xl'
                />
              </motion.div>
              <motion.div className='basis-1/3 p-8 flex flex-col gap-4 bg-muted dark:bg-muted/30 rounded-3xl'>
                <div className='w-20 h-20 rounded-full flex justify-center items-center bg-background relative shadow-xl overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full' />
                  <Box size={44} className='text-sidebar-active relative z-10' />
                </div>
                <h1 className='font-bold text-2xl'>UI Testing</h1>
                <p className='text-foreground/70'>
                  Introducing UI Testing. Generate simple test cases for your user interfaces with the power of AI.{' '}
                </p>
                <Link href={'#'} className='pt-6 flex items-center text-sidebar-active text-lg gap-1 font-medium'>
                  Learn More <ArrowRight />
                </Link>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      <section className='container flex flex-col justify-center items-center mb-36'>
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
          <Collapsible className='w-full pl-6 pr-4 py-4 bg-muted dark:bg-muted/30 rounded-2xl cursor-pointer hover:bg-muted/50'>
            <CollapsibleTrigger asChild>
              <div className='flex items-center justify-between'>
                <p className='font-medium'>What is WeTest?</p>
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
          <Collapsible className='w-full pl-6 pr-4 py-4 bg-muted dark:bg-muted/30 rounded-2xl cursor-pointer hover:bg-muted/50'>
            <CollapsibleTrigger asChild>
              <div className='flex items-center justify-between'>
                <p className='font-medium'>What can WeTest do?</p>
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
          <Collapsible className='w-full pl-6 pr-4 py-4 bg-muted dark:bg-muted/30 rounded-2xl cursor-pointer hover:bg-muted/50'>
            <CollapsibleTrigger asChild>
              <div className='flex items-center justify-between'>
                <p className='font-medium'>Extension not working?</p>
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
          <Collapsible className='w-full pl-6 pr-4 py-4 bg-muted dark:bg-muted/30 rounded-2xl cursor-pointer hover:bg-muted/50'>
            <CollapsibleTrigger asChild>
              <div className='flex items-center justify-between'>
                <p className='font-medium'>LLM API limit exceeded?</p>
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
    </div>
  );
}
