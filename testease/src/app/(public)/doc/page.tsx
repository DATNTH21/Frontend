import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableOfContents } from './_components/table-of-content';

export default function page() {
  const featureTableData = [
    {
      feature: 'Blackbox testing',
      description:
        'Testease most powerful feature. Blackbox testing supports users with up-to-date AI models power to auto generate test cases from your use cases'
    },
    {
      feature: 'Unit testing',
      description:
        'A feature from WeTest (Testease vscode extension) which helps developers auto generate test cases from your code with the power of AI'
    },
    {
      feature: 'API testing',
      description:
        'Testease most powerful feature. Blackbox testing supports users with up-to-date AI models power to auto generate test cases from your use cases'
    },
    {
      feature: 'UI testing',
      description:
        'Testease most powerful feature. Blackbox testing supports users with up-to-date AI models power to auto generate test cases from your use cases'
    }
  ];
  return (
    <div className='flex flex-row'>
      <nav className='hidden lg:block order-last sticky top-28 h-[calc(100vh-112px)] w-56 shrink-0'>
        <TableOfContents />
      </nav>
      <div className='article prose dark:prose-invert flex-1 px-6 max-w-none'>
        <header>
          <h1 className='font-semibold'>Introduction</h1>
          <p>Welcome to Testease documentation!</p>
        </header>

        <h2>
          <Separator />
          <p>What is Testease?</p>
        </h2>
        <p>
          Testease is an AI-powered test case generate tool designed to support test case design. By leveraging advanced
          AI models, Testease can automatically generate comprehensive test cases based on user input, reducing the
          manual effort required and enhancing test coverage.
        </p>
        <p>
          Testease supports multiple testing methodologies, including blackbox testing, unit testing, API testing, and
          UI testing. For developers working in Visual Studio Code, unit, API, and UI testing capabilities are
          seamlessly integrated into the WeTest VS Code extension, making it easier than ever to create, execute, and
          manage tests directly within the development environment.
        </p>
        <p>
          Beyond automation, Testease offers dashboards and configuration to track progress, optimize testing, and
          improve software quality. With intelligent insights and automation, Testease helps teams accelerate testing,
          boost efficiency, and deliver high-quality applications faster.
        </p>

        <h2>
          <Separator />
          <p>Main features</p>
        </h2>
        <p>Testease main features include:</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-foreground font-semibold'>Feature</TableHead>
              <TableHead className='text-foreground font-semibold'>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {featureTableData.map((feature) => (
              <TableRow key={feature.feature}>
                <TableCell className='text-sidebar-active'>{feature.feature}</TableCell>
                <TableCell>{feature.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h2>
          <Separator />
          <p>How to use this documentation?</p>
        </h2>
        <p>On the left side of the screen, you'll find the docs navbar.</p>
        <p>
          The pages of the docs are organized sequentially, from basic to advanced, so you can follow them step-by-step
          when building your application. However, you can read them in any order or skip to the pages that apply to
          your use case.
        </p>
        <p>
          On the right side of the screen, you'll see a table of contents that makes it easier to navigate between
          sections of a page.
        </p>
      </div>
    </div>
  );
}
