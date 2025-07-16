import React from "react";
import { Separator as BaseSeparator } from "@base-ui-components/react";

const Separator = ({ className }: { className?: string }) => {
  const baseStyles = "my-8 border-t border-gray-300 dark:border-gray-700 h-2";
  return <BaseSeparator className={`${baseStyles} ${className}`} />;
};

export default Separator;
