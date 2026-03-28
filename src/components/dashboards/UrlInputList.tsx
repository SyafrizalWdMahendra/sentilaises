import { UrlInputListProps } from "@/src/types";
import UrlInputItem from "./UrlInputItem";

const UrlInputList = ({
  urlDatas,
  visibleFields,
  setVisibleFields,
}: UrlInputListProps) => {
  return (
    <>
      {urlDatas.slice(0, visibleFields).map((item, index) => (
        <UrlInputItem
          key={index}
          item={item}
          index={index}
          visibleFields={visibleFields}
          onRemove={() => setVisibleFields((prev) => prev - 1)}
        />
      ))}
    </>
  );
};

export default UrlInputList;
