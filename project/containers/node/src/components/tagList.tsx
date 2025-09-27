import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState } from "react";
import { AddTag } from "./addTag";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { TagGet } from "@/lib/services/returnTypes";
import { getTextColor } from "@/lib/managers/colorManager";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface TagListProps {
  form?: any;
  modifyTagList?: string[];
}

export default function TagList({ form, modifyTagList }: TagListProps) {
  const { t } = useTranslation();
  const [selectedTagsName, setSelectedTagsName] = useState<string[]>(
    modifyTagList ? modifyTagList : [],
  );

  const tags: TagGet[] = useSelector((state: any) => state.tagArray.tagArray);

  return (
    <FormField
      control={form.control}
      name="tags"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{t("TAG_LIST_TAGS")}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between overflow-hidden mt-1",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value && field.value.length != 0 ? (
                    field.value
                      .map((tag: string) => tags.find((el: TagGet) => el.tagId === tag)?.name)
                      .join(", ")
                  ) : (
                    <>{t("SELECT_TAGS")}</>
                  )}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0" side="top">
              <Command>
                <CommandInput placeholder={t("SELECT_TAGS")} className="h-9" />
                <CommandEmpty>{t("SELECT_TAGS")}.</CommandEmpty>
                <AddTag tags={tags} />
                <CommandGroup className="max-h-60 overflow-y-scroll overflow-x-hidden">
                  {tags.map((tag: TagGet) => (
                    <CommandItem
                      value={tag.name}
                      key={tag.tagId}
                      onSelect={() => {
                        const selectedTags = Array.isArray(field.value) ? field.value : [];
                        if (!selectedTags.includes(tag.tagId)) {
                          form.setValue("tags", [...selectedTags, tag.tagId]);
                          setSelectedTagsName([...selectedTagsName, tag.name]);
                        } else {
                          form.setValue(
                            "tags",
                            selectedTags.filter((selectedTag) => selectedTag !== tag.tagId),
                          );
                          setSelectedTagsName(
                            selectedTagsName.filter((selectedTag) => selectedTag !== tag.name),
                          );
                        }
                      }}
                    >
                      <div
                        className="w-2 h-2 mr-3 rounded-full"
                        style={{ background: getTextColor("#" + tag.hexColor, 20) }}
                      ></div>
                      {tag.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          field.value && field.value.includes(tag.tagId)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
