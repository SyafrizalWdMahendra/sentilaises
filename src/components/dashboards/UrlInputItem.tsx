import { UrlInputItemProps } from "@/src/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const UrlInputItem = ({
  item,
  index,
  visibleFields,
  onRemove,
  isDark,
}: UrlInputItemProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <label
        className={`block mb-1 text-sm font-medium ${isDark ? "text-white" : "text-gray-700"} transition-all duration-500`}
      >
        {item.labels}
      </label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="url"
            placeholder="Contoh: https://tokopedia.com/..."
            className={`${item.errors ? "border-sentiment-negative" : "focus:ring-primary"} ${isDark ? "bg-gray-800 text-white" : "bg-white"} transition-all duration-500 w-full`}
            {...item.title}
          />
        </div>
        {index === visibleFields - 1 && (
          <Button
            type="button"
            onClick={onRemove}
            className={`shrink-0 ${isDark ? "text-sentiment-negative bg-transparent hover:text-sentiment-negative hover:bg-sentiment-negative/10" : "text-sentiment-negative bg-card hover:text-sentiment-negative hover:bg-sentiment-negative-light"} transition-all duration-500`}
          >
            ✕
          </Button>
        )}
      </div>
    </div>
  );
};

export default UrlInputItem;
