import { generateStaticContent, EmailFields } from "../mockedStorage.ts";
import {
  FC,
  MouseEventHandler,
  MouseEvent,
  useState,
  useRef,
  useCallback,
} from "react";
import { EmailsList } from "./EmailsList.tsx";
import { useClickOutside } from "../hooks/useClickOutside.ts";
import { useKeyPress } from "../hooks/useKeyPress.ts";

export const EmailsContainer: FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const [emails, setEmails] = useState<EmailFields[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  useClickOutside(containerRef, () => {
    setSelectedEmails([]);
  });

  useKeyPress((event: KeyboardEvent) => {
    if (event.key === "Backspace" && selectedEmails.length) {
      setEmails(removeEmailFromList(selectedEmails));
      setSelectedEmails(() => []);
    }
  });

  useKeyPress((event: KeyboardEvent) => {
    if (event.ctrlKey && event.keyCode === 78) {
      setEmails((prevState: EmailFields[]) => [
        generateStaticContent(),
        ...prevState,
      ]);
    }
  });

  const handleAddEmail: MouseEventHandler<HTMLButtonElement> = () => {
    setEmails((prevState) => [generateStaticContent(), ...prevState]);
  };

  const handleArchive: MouseEventHandler<HTMLButtonElement> = () => {
    setEmails(removeEmailFromList(selectedEmails));
    setSelectedEmails(() => []);
  };

  const handleEmailSelection = useCallback(
    (event: MouseEvent<HTMLButtonElement>, id: string) => {
      const isEmailSelected = selectedEmails.includes(id);

      if (event.shiftKey && selectedEmails.length !== 0) {
        setSelectedEmails(selectEmailsBulk(id, emails, selectedEmails));

        return;
      }

      if (isEmailSelected) {
        setSelectedEmails((prevState: string[]) =>
          prevState.filter((selectedId: string) => selectedId !== id),
        );

        return;
      }

      setSelectedEmails((prevState: string[]) => [...prevState, id]);
    },
    [emails, selectedEmails],
  );

  return (
    <section
      ref={containerRef}
      className="flex flex-col w-full max-w-lg rounded shadow-md shadow-gray-200 bg-white"
    >
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

/**
 * Helper function for removing items of email list
 * @function using only inside component {@link EmailsContainer}
 * @param selectedEmails
 */
function removeEmailFromList(selectedEmails: string[]) {
  return (list: EmailFields[]) =>
    list.filter(({ id }: EmailFields) => !selectedEmails.includes(id));
}

/**
 * Helper function which selects email items in a certain range
 * @function using only inside component {@link EmailsContainer}
 * @param id
 * @param emails
 * @param selectedEmails
 */
function selectEmailsBulk(
  id: string,
  emails: EmailFields[],
  selectedEmails: string[],
): string[] {
  const findIndexById = (sId: string) => {
    return ({ id: emailId }: EmailFields) => emailId === sId;
  };

  const lastSelectedId = selectedEmails[selectedEmails.length - 1];
  const lastSelectedIdx = emails.findIndex(findIndexById(lastSelectedId));
  const currentSelectedIdx = emails.findIndex(findIndexById(id));

  const selectedRange = emails.slice(
    Math.min(lastSelectedIdx, currentSelectedIdx),
    Math.max(currentSelectedIdx + 1, lastSelectedIdx + 1),
  );

  return selectedRange.map(({ id: emailId }) => emailId);
}
