import FileIcon from '@/public/assets/svg/file.svg';
import FolderIcon from '@/public/assets/svg/folder.svg';

const FileStructure = () => {
  return (
    <div className='w-1/4 p-4 border-r'>
      <h3 className='font-bold mt-6 mb-4'>Files</h3>
      <div>
        <div>
          <button className='flex items-center space-x-2'>
            <FolderIcon className='w-6' />
            <span>Description</span>
          </button>
          <button className='flex items-center space-x-2'>
            <FolderIcon className='w-6' />
            <span>Test cases</span>
          </button>
          <button className='flex items-center space-x-2'>
            <FolderIcon className='w-6' />
            <span>Use cases</span>
          </button>
          <div className='ml-4 mt-2'>
            <div className='flex items-center space-x-2'>
              <FileIcon className='w-6' />
              <span>File 1</span>
            </div>
            <div className='flex items-center space-x-2'>
              <FileIcon className='w-6' />
              <span>File 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileStructure;
