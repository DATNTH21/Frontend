'use client';
import React from 'react';
import { motion } from 'motion/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function page() {
  return (
    <div className='flex flex-col gap-36 min-h-[100vh] overflow-hidden relative'>
      <section className='pt-36 container flex flex-col justify-center items-center'>
        <h5 className='text-sidebar-active text-2xl font-semibold'>Contact</h5>
        <h1 className='font-semibold text-[55px] mb-4 text-center'>Connect with our team</h1>
        <p className='text-[#A1A1A1]'>We're ready to assist and chat with you</p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
          className='text-center w-full flex flex-col justify-center items-center'
        >
          <form className='w-full lg:w-1/2 md:w-1/2 mt-12'>
            <div className='flex flex-col lg:flex-row justify-between items-center gap-6'>
              <Input placeholder='Name' className='rounded-xl'></Input>
              <Input placeholder='Email' className='rounded-xl'></Input>
            </div>
            <Textarea placeholder='Message' className='min-h-36 mt-6 rounded-xl' />
            <Button className='w-full mt-6 rounded-xl'>Send</Button>
          </form>
        </motion.div>
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
          <Collapsible className='w-full pl-6 pr-4 py-4 bg-muted dark:bg-muted/30 rounded-2xl cursor-pointer hover:bg-muted/50'>
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
          <Collapsible className='w-full pl-6 pr-4 py-4 bg-muted dark:bg-muted/30 rounded-2xl cursor-pointer hover:bg-muted/50'>
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
          <Collapsible className='w-full pl-6 pr-4 py-4 bg-muted dark:bg-muted/30 rounded-2xl cursor-pointer hover:bg-muted/50'>
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
    </div>
  );
}
