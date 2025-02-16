import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
    },
    {
      feature: 'Test report and management',
      description:
        'Testease most powerful feature. Blackbox testing supports users with up-to-date AI models power to auto generate test cases from your use cases'
    }
  ];
  return (
    <div className='flex flex-row'>
      <nav className='order-last sticky top-28 min-h-[calc(100vh-112px)] w-56 shrink-0'></nav>
      <div className='flex-1 px-6'>
        <header>
          <h1 className='text-4xl font-semibold mb-8'>Introduction</h1>
          <p className='my-5'>Welcome to Testease documentation!</p>
        </header>

        <h2 className='mt-12 mb-6'>
          <Separator />
          <p className='pt-10 font-semibold text-2xl'>What is Testease?</p>
        </h2>
        <p className='mb-5'>
          Testease is an AI-powered test management tool designed to streamline the entire testing lifecycle, from test
          case generation to execution and reporting. By leveraging advanced AI models, Testease can automatically
          generate comprehensive test cases based on user input, reducing the manual effort required and enhancing test
          coverage.
        </p>
        <p className='mb-5'>
          Testease supports multiple testing methodologies, including blackbox testing, unit testing, API testing, and
          UI testing. For developers working in Visual Studio Code, unit, API, and UI testing capabilities are
          seamlessly integrated into the WeTest VS Code extension, making it easier than ever to create, execute, and
          manage tests directly within the development environment.
        </p>
        <p className='mb-5'>
          Beyond automation, Testease offers test reports, dashboards, and management features to track progress,
          optimize testing, and improve software quality. With intelligent insights and automation, Testease helps teams
          accelerate testing, boost efficiency, and deliver high-quality applications faster.
        </p>

        <h2 className='mt-12 mb-6'>
          <Separator />
          <p className='pt-10 font-semibold text-2xl'>Main features</p>
        </h2>
        <p className='mb-5'>Testease main features include:</p>
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

        <h2 className='mt-12 mb-6'>
          <Separator />
          <p className='pt-10 font-semibold text-2xl'>How to use this documentation?</p>
        </h2>
        <p className='mb-5'>
          On the left side of the screen, you'll find the docs navbar. The selection box is there to help you switching
          between Testease features.
        </p>
        <p className='mb-5'>
          The pages of the docs are organized sequentially, from basic to advanced, so you can follow them step-by-step
          when building your application. However, you can read them in any order or skip to the pages that apply to
          your use case.
        </p>
        <p className='mb-5'>
          On the right side of the screen, you'll see a table of contents that makes it easier to navigate between
          sections of a page.
        </p>
      </div>
    </div>
  );
}
