import { UrlInputItemProps } from "@/src/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const UrlInputItem = ({
  item,
  index,
  visibleFields,
  onRemove,
}: UrlInputItemProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {item.labels}
      </label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="url"
            placeholder="Contoh: https://tokopedia.com/..."
            className={`${item.errors ? "border-sentiment-negative" : "focus:ring-primary"}`}
            {...item.title}
          />
        </div>
        {index === visibleFields - 1 && (
          <Button
            type="button"
            variant="ghost"
            onClick={onRemove}
            className="text-sentiment-negative hover:text-sentiment-negative hover:bg-sentiment-negative-light shrink-0"
          >
            ✕
          </Button>
        )}
      </div>
    </div>
  );
};

export default UrlInputItem;
