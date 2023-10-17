import React, { useState } from 'react';
import Modal from 'react-modal';

const ChatBotButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [fullPageMode, setFullPageMode] = useState(false);

    const toggleChatWindow = () => {
        setModalIsOpen(!modalIsOpen);
    };

    const toggleFullPage = () => {
        setModalIsOpen(true);
        setFullPageMode(!fullPageMode);
    };

    return (
        <div className="fixed bottom-5 right-5 z-10">
            <button
                type="button"
                className={`text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl 
                    focus:ring-4 focus:outline-none focus:ring-green-200 
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 chatbot-button`}
                onClick={toggleChatWindow}
            >
                {modalIsOpen ? 'Close Chat' : 'Open Chat'}
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="ChatBot"
                className={`bg-gray-200 p-4 ${
                    fullPageMode
                        ? 'fixed top-0 right-0 left-0 bottom-0 flex flex-col'
                        : 'absolute top-10 right-5 bottom-10 w-1/2'
                }`}
                overlayClassName="bg-black bg-opacity-60 fixed top-0 right-0 bottom-0 left-0"
            >
                <div className="h-full relative">
                    <button
                        className={`absolute  ${fullPageMode ? 'top-5 right-5 px-4 py-2' : 'top-0 right-0 px-1 py-1'} bg-gradient-to-br from-green-400 to-sky-300 hover:bg-gradient-to-bl 
                            focus:ring-4 focus:outline-none focus:ring-green-200 
                            font-medium rounded-lg text-sm  text-center text-white`}
                        onClick={toggleFullPage}
                    >
                        {fullPageMode ? 'Minimize' : 'Full page'}
                    </button>
                    <iframe
                        src="http://127.0.0.1:1338"
                        title="Embedded Page"
                        className={fullPageMode ? 'w-full h-full' : 'w-full h-full'}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ChatBotButton;
