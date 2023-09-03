import * as classNames from "classnames";
import { FC, MouseEventHandler } from "react";
import { motion } from "framer-motion";

type EmailListItemProps = {
  id: string;
  content: { title: string; text: string };
  isSelected: boolean;

  onSelectEmail: (id: string) => void;
};

export const EmailListItem: FC<EmailListItemProps> = ({
  id,
  content,
  isSelected,
  onSelectEmail,
}) => {
  const handleSelectEmail: MouseEventHandler<HTMLButtonElement> = () => {
    onSelectEmail(id);
  };

  return (
    <div className="p-1">
      <motion.button
        onClick={handleSelectEmail}
        className={classNames(
          `flex flex-col w-full text-left p-1 overflow-hidden rounded transition`,
          isSelected && `bg-blue-400 text-white`,
        )}
      >
        <h2 className="w-full font-medium overflow-hidden text-ellipsis whitespace-nowrap">
          {content.title}
        </h2>
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {content.text}
        </p>
      </motion.button>
    </div>
  );
};
