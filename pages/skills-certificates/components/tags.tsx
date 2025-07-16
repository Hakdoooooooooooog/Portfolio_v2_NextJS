const Tags = ({ tags }: { tags: string[] }) => {
  return tags.map((tag, index) => (
    <span
      key={index}
      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
    >
      {tag}
    </span>
  ));
};

export default Tags;
