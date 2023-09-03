import { generateStaticContent, EmailFields } from "./mockedStorage.ts";
import { MouseEventHandler, useState } from "react";
import { EmailsList } from "./EmailsList.tsx";

export const EmailsContainer = () => {
  const [emails, setEmails] = useState<EmailFields[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const handleAddEmail: MouseEventHandler<HTMLButtonElement> = () => {
    const email: EmailFields = generateStaticContent();

    setEmails((prevState) => [email, ...prevState]);
  };

  const handleArchive: MouseEventHandler<HTMLButtonElement> = () => {
    setEmails((prevState: EmailFields[]) =>
      prevState.filter(({ id }: EmailFields) => !selectedEmails.includes(id)),
    );
  };

  const handleEmailSelection = (id: string) => {
    const isEmailSelected = selectedEmails.includes(id);

    if (isEmailSelected) {
      setSelectedEmails((prevState: string[]) =>
        prevState.filter((selectedId: string) => selectedId !== id),
      );
    } else {
      setSelectedEmails((prevState: string[]) => [...prevState, id]);
    }
  };

  return (
    <section className="flex flex-col w-full max-w-lg rounded shadow-md shadow-gray-200 bg-white">
      <header className="w-full flex flex-row justify-between rounded rounded-b-none bg-zinc-100 border-b p-4">
        <button
          className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-500"
          onClick={handleAddEmail}
        >
          Add
        </button>
        <button
          onClick={handleArchive}
          className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-500"
        >
          Archive
        </button>
      </header>

      <div className="max-h-[400px] overflow-y-scroll px-2 py-3">
        <EmailsList
          emails={emails}
          selectedEmails={selectedEmails}
          onSelectEmail={handleEmailSelection}
        />
      </div>
    </section>
  );
};
