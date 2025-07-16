import { TCertificate } from "@/portfolio/utils/types";

const Tags = ({ item }: { item: Pick<TCertificate, "metadata"> }) => {
  if (
    !item ||
    !item.metadata ||
    !item.metadata.tags ||
    !Array.isArray(item.metadata.tags)
  ) {
    return null;
  }

  return item.metadata.tags.map((tag, index) => (
    <span
      key={index}
      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
    >
      {tag}
    </span>
  ));
};

export default Tags;
