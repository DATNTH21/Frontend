const EditTestCaseDetail = () => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <h3 className='text-xl font-bold mb-4'>Edit Test Case</h3>
        <div className='mb-4'>
          <label className='block mb-2'>Test Case Title:</label>
          <input type='text' defaultValue='Test user log out' className='border border-gray-300 p-2 w-full rounded' />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Precondition:</label>
          <input type='text' defaultValue='User has logged in' className='border border-gray-300 p-2 w-full rounded' />
        </div>
        {/* Add more fields as needed */}
        <div className='flex justify-end'>
          <button onClick={closeEdit} className='bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700'>
            Cancel
          </button>
          <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700'>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditTestCaseDetail;
