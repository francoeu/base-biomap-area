import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useState } from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  photoUrl: string;
  description: string;
  children: ReactNode;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, photoUrl, description, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shortDescription = description.slice(0, 150);
  const hasMoreDescription = description.length > 150;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#292929] shadow-lg rounded-lg overflow-hidden ">
      <div className="flex flex-col justify-center items-center md:justify-between md:flex-row">
        <img src={photoUrl} alt={name} className="w-64 h-64 object-cover rounded-md md:rounded-none mt-4 md:mt-0" />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-500 font-semibold text-xs">{role}</p>
          <p className="mt-2 text-sm font-light">
            {shortDescription}
            {hasMoreDescription && (
              <>
                {'... '}
                <button
                  className="text-[#0FB268] p-1 hover:bg-gray-800 rounded-md"
                  onClick={openModal}
                >
                  Continue lendo
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      <Transition appear show={isModalOpen} as={Fragment}>
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

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center mt-24 md:mt-16">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#292929] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-100 z-20"
                  >
                    {name}
                  </Dialog.Title>
                  <div className="mt-2">
         
                    {children}
           
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#111111] px-4 py-2 text-sm font-medium text-gray-100 hover:bg-[#1B1A1A] hover:text-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Fechar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* <Dialog open={isModalOpen} onClose={closeModal} className="fixed inset-0 z-50">
        <Dialog.Overlay className="fixed flex justify-center inset-0 bg-black opacity-50" />

        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-950 w-7/12">
          <Dialog.Title className="text-xl font-semibold text-gray-800">{name}</Dialog.Title>
          <Dialog.Description className="text-gray-500 mt-2">{role}</Dialog.Description>
          <div className="mt-4">
            <img src={photoUrl} alt={name} className="w-64 h-64 mx-auto object-cover" />
            <p className="mt-4 text-gray-700">{description}</p>
          </div>
          <button
            className="mt-4 text-blue-500 hover:underline"
            onClick={closeModal}
          >
            Fechar
          </button>
        </div>
      </Dialog> */}
    </div>
  );
};

export default TeamMember;
