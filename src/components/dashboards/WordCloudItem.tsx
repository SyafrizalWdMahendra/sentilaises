import { cn } from "@/lib/utils";
import { WordCloudItemProps } from "@/src/types";
import { setWordCloud } from "@/src/utils/datas";

const WordCloudItem: React.FC<WordCloudItemProps> = ({
  word,
  index,
  minValue,
  maxValue,
}) => {
  const { getSize, getColor } = setWordCloud({ minValue, maxValue });

  return (
    <span
      className={cn(
        "cursor-default rounded-lg px-2 py-1 font-medium transition-all duration-200 animate-in fade-in zoom-in",
        getColor(word.sentiment),
      )}
      style={{
        fontSize: `${getSize(word.value)}rem`,
        animationDelay: `${index * 50}ms`,
        animationFillMode: "both",
      }}
      title={`${word.text}: ${word.value} kemunculan`}
    >
      {word.text}
    </span>
  );
};

export default WordCloudItem;
