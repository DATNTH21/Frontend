import { Separator } from '@/components/ui/separator';
import { TableOfContents } from '../../../_components/table-of-content';
import Image from 'next/image';

export default function CreateProject() {
  return (
    <div className='flex flex-row'>
      <nav className='hidden lg:block order-last sticky top-28 h-[calc(100vh-112px)] w-56 shrink-0'>
        <TableOfContents />
      </nav>
      <div className='article prose dark:prose-invert flex-1 px-6 max-w-none'>
        <header>
          <h1 className='font-semibold'>Create project</h1>
        </header>

        <h2>
          <Separator />
          <p>What is a project?</p>
        </h2>
        <p>
          A project is where we manage all use cases, scenarios and test cases generation as well as statistics and
          configuration. To start generating, we need to create at least one project.
        </p>

        <h2>
          <Separator />
          <p>Project management view</p>
        </h2>
        <p>To create a project, make sure you have created a Testease account and logged in.</p>
        <p>
          On the right side of your navigation bar, notice the avatar when you have logged in. Click on the avatar to
          open the selection menu. Click <span className='text-sidebar-active'>Project</span> option to proceed to our
          Project management view.
        </p>

        <Image
          src='/doc/testease-core/create-project-1.png'
          alt='create-project-1'
          width={1220}
          height={300}
          className='w-full h-auto rounded-lg border'
        ></Image>

        <p>Take a look at our Project management view, we have: </p>
        <Image
          src='/doc/testease-core/all-project.png'
          alt='create-project-1'
          width={1220}
          height={300}
          className='w-full h-auto rounded-lg border'
        ></Image>
        <ul>
          <li>
            A sidebar on the right. Sidebar header is a selection box to navigate quickly between projects. Sidebar
            footer is for your profile management and log out.
          </li>
          <li>In the main panel, we can see a project table. This is where we manage all of your projects.</li>
        </ul>

        <h2>
          <Separator />
          <p>How to create a project?</p>
        </h2>

        <p>Click the create project button on the top right of the main panel to open Create Project dialog</p>
        <Image
          src='/doc/testease-core/create-project-2.png'
          alt='create-project-1'
          width={1220}
          height={300}
          className='w-full h-auto rounded-lg border'
        ></Image>
        <p>
          To create a project, please enter a project name. Try to enter a descriptive name that best present the
          project. A project description is optional.
        </p>
        <p>
          Click Create to finish creating a project. Wait for our system to notify whether the project is created
          successfully.
        </p>
        <p>
          Once created successfully, you will see your newly created project in the project table with some basic
          information
        </p>
      </div>
    </div>
  );
}
