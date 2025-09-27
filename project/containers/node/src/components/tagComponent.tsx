"use client";

import { getTextColor } from "@/lib/managers/colorManager";
import { TagGet } from "@/lib/services/returnTypes";

interface TagProps {
  tag: TagGet;
}

export default function TagComponent({ tag }: TagProps) {
  const colorHex: string = "#" + tag.hexColor;

  const styles = {
    background: colorHex,
    color: getTextColor(colorHex),
    border: `2px solid ${getTextColor(colorHex)}`,
  };

  return (
    <span
      className="text-nowrap inline-block rounded-full text-xs px-2 leading-[15px] h-[18px]"
      style={styles}
    >
      {tag.name}
    </span>
  );
}
