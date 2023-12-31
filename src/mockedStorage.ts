import { v4 as getUniqueId } from "uuid";

const content: string[] = [
  "Get RSS feed for your Ko-Fi account",
  "Hit 1000 followers on DEV 🎉 🎉 🎉",
  "A Developer's Guide to Blogging",
  "Writing a NES game day 10: Working with graphics",
  "Migrating my blog from Gatsby to Astro",
  "A Beginner's Guide to Static Forms",
  "How to add a blog to Next.js using Hyvor Blogs?",
  "How to use the useCallback hook in React",
  "Need help for deleting a WordPress Cookie with setcookie() Not Working",
  "Effective use of middleware in express.js: practical approaches",
];

export type EmailFields = {
  id: string;
  content: {
    title: string;
    text: string;
  };
};

export function generateStaticContent(): EmailFields {
  const uniqueId = getUniqueId();

  return {
    id: uniqueId,
    content: {
      title: content[Math.floor(Math.random() * content.length)],
      text: content[Math.floor(Math.random() * content.length)],
    },
  };
}
