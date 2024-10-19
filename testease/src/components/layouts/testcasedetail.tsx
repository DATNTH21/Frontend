const TestCaseDetail = () => {
  return (
    <div className='fixed right-0 top-0 w-1/3 h-full bg-white shadow-lg p-4 border-l border-gray-200'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>Test Case Details</h2>
        <button className='text-gray-500 hover:text-gray-700'>&#10005; {/* Close icon */}</button>
      </div>
      <div>
        <p>
          <strong>Test Case:</strong> Test user log out
        </p>
        <p>
          <strong>Precondition:</strong> User has logged in
        </p>
        <p>
          <strong>Related Usecase:</strong> Usecase 1
        </p>
        <p>
          <strong>Tags:</strong> Sprint 1
        </p>
        <div>
          <p>
            <strong>All Steps:</strong>
          </p>
          <ol>
            <li>Step 1: Navigate to the logout button</li>
            <li>Step 2: Click on the logout button</li>
          </ol>
        </div>
        <p>
          <strong>Expected Result:</strong> User logged out successfully
        </p>
        <p>
          <strong>Actual Result:</strong> (Fill this out)
        </p>
      </div>
      <div className='mt-4'>
        <button onClick={openEdit} className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700'>
          Edit
        </button>
      </div>
    </div>
  );
};

export default TestCaseDetail;
