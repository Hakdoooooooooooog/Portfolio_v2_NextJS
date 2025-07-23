import ImageModal from "@/portfolio/components/modal-image";
import { TCertificate } from "@/portfolio/utils/types";
import Tags from "./tags";
import useIsSmallDevice from "@/portfolio/utils/hooks/useIsSmallDevice";

const Certificates = ({ src, alt, metadata }: Omit<TCertificate, "id">) => {
  const isSmallDevice = useIsSmallDevice();

  return (
    <div className="certificates bg-white dark:bg-gray-800/80 rounded-lg shadow-lg overflow-clip">
      <div className="relative">
        <ImageModal
          src={src}
          alt={alt}
          width={300}
          height={200}
          className="w-full h-60 object-cover"
        />
        {isSmallDevice && (
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-black/80 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg flex items-center gap-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 7L10 10L7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Tap to enlarge
            </div>
          </div>
        )}
      </div>
      {metadata && (
        <div className="p-4">
          <div className="mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Issued: {new Date(metadata.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tags item={{ metadata }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
