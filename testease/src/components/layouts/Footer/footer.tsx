'use client';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Separator } from '@/components/ui/separator';
export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className='container bg-muted dark:bg-muted/30 pt-24 rounded-3xl mb-8 flex justify-center'
    >
      <div className='lg:max-w-[80%] flex flex-col items-center gap-24'>
        <div className='flex flex-col lg:flex-row md:flex-row justify-between items-start gap-12'>
          <div className='basis-2/4 flex flex-col gap-6'>
            <div className='flex items-center'>
              <Image src={'/svg/logo.svg'} width={24} height={24} alt='logo' className='w-9 h-9' />
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
  );
}
