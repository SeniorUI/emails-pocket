import { MouseEventHandler, useState } from "react";
import { generateStaticContent, StaticContentFields } from "./mockedStorage.ts";
import * as classNames from "classnames";

const App = () => {
  const [emails, setEmails] = useState<StaticContentFields[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const handleAddEmail: MouseEventHandler<HTMLButtonElement> = () => {
    const email: StaticContentFields = generateStaticContent();

    setEmails((prevState) => [...prevState, email]);
  };

  const handleArchive: MouseEventHandler<HTMLButtonElement> = () => {
    setEmails((prevState: StaticContentFields[]) =>
      prevState.filter(
        ({ id }: StaticContentFields) => !selectedEmails.includes(id),
      ),
    );
  };

  const toggleEmailSelection = (id: string) => {
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
    <main className="flex justify-center items-center h-screen w-full bg-gray-50 p-2">
      <section className="flex flex-col w-full max-w-lg rounded shadow-md shadow-gray-200 bg-white">
        <header className="w-full flex flex-row justify-between rounded rounded-b-none bg-zinc-100 border-b p-3">
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
        <ul className="flex flex-col p-2 max-h-[400px] overflow-scroll">
          {emails.length === 0 && (
            <li>
              <h2 className="text-center text-gray-500 text-sm">
                You need to add a message
              </h2>
            </li>
          )}
          {emails.map(({ id, content }: StaticContentFields) => (
            <li>
              <div className="p-1">
                <button
                  onClick={() => toggleEmailSelection(id)}
                  className={classNames(
                    `flex flex-col w-full text-left p-1 overflow-hidden rounded transition`,
                    selectedEmails.includes(id) && `bg-blue-400 text-white`,
                  )}
                >
                  <h2 className="w-full font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                    {content.title}
                  </h2>
                  <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {content.text}
                  </p>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default App;
