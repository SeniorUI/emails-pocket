import { EmailFields } from "./mockedStorage.ts";
import { FC } from "react";
import { EmailListItem } from "./EmailListItem.tsx";
import { AnimatePresence, motion } from "framer-motion";

type EmailsListProps = {
  emails: EmailFields[];
  selectedEmails: string[];

  onSelectEmail: (id: string) => void;
};

export const EmailsList: FC<EmailsListProps> = ({
  emails = [],
  selectedEmails = [],
  onSelectEmail,
}) => {
  return (
    <ul>
      <AnimatePresence initial={false} presenceAffectsLayout>
        {emails.length === 0 && (
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-center text-gray-500 text-sm font-medium p-2">
              You need to add a message
            </h2>
          </motion.li>
        )}
        {emails.map(({ id, content }: EmailFields) => (
          <motion.li
            key={id}
            className="relative"
            initial={{ y: -50, height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                bounce: 0.3,
                opacity: { delay: 0.1 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              scaleY: 0.8,
              y: 30,
            }}
          >
            <EmailListItem
              id={id}
              content={content}
              isSelected={selectedEmails.includes(id)}
              onSelectEmail={onSelectEmail}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};
