import Image from "next/image";

const FileStructure = () => {
  return (
    <div className='w-1/4 p-4 border-r'>
      <h3 className='font-bold mt-6 mb-4'>Files</h3>
      <div>
        <div>
          <button className='flex items-center space-x-2'>
            <Image src={"/assets/svg/folder.svg"} alt="Folder" width={24} height={24} />
            <span>Description</span>
          </button>
          <button className='flex items-center space-x-2'>
            <Image src={"/assets/svg/folder.svg"} alt="Folder" width={24} height={24} />
            <span>Test cases</span>
          </button>
          <button className='flex items-center space-x-2'>
            <Image src={"/assets/svg/folder.svg"} alt="Folder" width={24} height={24} />
            <span>Use cases</span>
          </button>
          <div className='ml-4 mt-2'>
            <div className='flex items-center space-x-2'>
              <Image src={"/assets/svg/file.svg"} alt="File" width={24} height={24} />
              <span>File 1</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Image src={"/assets/svg/file.svg"} alt="File" width={24} height={24} />
              <span>File 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileStructure;
