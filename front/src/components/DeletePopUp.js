import React from 'react';

const DeletePopUp = ({handleCancel, handleDeleteAcount}) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="relative p-4 text-center bg-white rounded-lg shadow ">
                <button
                    onClick={handleCancel}
                    type="button"
                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                >
                    <span className="sr-only">Close modal</span>
                </button>
                <p className="mb-4 text-gray-500 ">
                    Are you sure you want to delete your account?
                </p>
                <div className="flex justify-center items-center space-x-4">
                    <button
                        onClick={handleCancel}
                        type="button"
                        className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10  "
                    >
                        No, cancel
                    </button>
                    <button
                        onClick={handleDeleteAcount}
                        type="submit"
                        className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300  "
                    >
                        Yes, I'm sure
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopUp;
