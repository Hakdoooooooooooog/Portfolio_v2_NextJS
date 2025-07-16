import ImageModal from "@/portfolio/components/modal-image";
import { TCertificate } from "@/portfolio/utils/types";
import { Tags } from "./Tags";

export const Certificates = ({
  src,
  alt,
  metadata,
}: Omit<TCertificate, "id">) => {
  return (
    <div className="certificates bg-white dark:bg-gray-800/80 rounded-lg shadow-lg overflow-clip">
      <ImageModal
        src={src}
        alt={alt}
        width={300}
        height={200}
        className="w-full h-60 object-cover"
      />
      {metadata && (
        <div className="p-4">
          <div className="mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Issued: {new Date(metadata.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tags tags={metadata.tags} />
          </div>
        </div>
      )}
    </div>
  );
};
