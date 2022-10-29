import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { AiFillGithub, AiOutlineCopyrightCircle } from 'react-icons/ai';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
}

const AboutModal: React.FC<Props> = ({ isOpen, closeModal }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`bg-gray-200 dark:bg-Grey modal`}
                            >
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-semibold"
                                >
                                    About CsTimer Clone
                                </Dialog.Title>
                                <p className="my-4 text-center">
                                    It is a cube timer inspired by{' '}
                                    <a
                                        className="text-Neon-100"
                                        href="https://cstimer.net/"
                                        target="_blank"
                                    >
                                        CsTimer
                                    </a>
                                    .I have added authentication in my cube
                                    timer so that users can have their solves
                                    persist.The whole web app is made with
                                    latest technologies such as Next js,Nest
                                    js,Framer motion etc.The full source code of
                                    this web app is given below.
                                </p>

                                <p className="flex items-center">
                                    <AiOutlineCopyrightCircle className="mr-2" />
                                    {new Date().getFullYear()} Naman Arora
                                </p>

                                <a
                                    className="bg-purple-500 text-white py-2 px-4 rounded mt-2 flex items-center cursor-pointer"
                                    href="https://github.com/namanArora1022/cstimer"
                                    target="_blank"
                                >
                                    <AiFillGithub className="mr-2" />
                                    <span>Source Code</span>
                                </a>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AboutModal;
