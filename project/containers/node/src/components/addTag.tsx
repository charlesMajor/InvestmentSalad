import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useState } from "react";
import FormTitle from "./formTitle";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTag } from "@/redux/tagArray";
import {
  MIN_TAG_NAME_LENGTH,
  MAX_TAG_NAME_LENGTH,
  TAG_COLOR_LENGTH,
  isTagUnique,
} from "@/lib/utils/constants/formValidation";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { TagGet } from "@/lib/services/returnTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTag } from "@/lib/services/tagService";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface AddTagProps {
  tags: TagGet[];
}

export function AddTag({ tags }: AddTagProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const dispatch = useDispatch();

  const ADD_TAG_NAME_LENGTH = t("ADD_TAG_NAME_LENGTH", {
    minLength: MIN_TAG_NAME_LENGTH,
    maxLength: MAX_TAG_NAME_LENGTH,
  });

  const formSchemaTag = z
    .object({
      name: z
        .string({ required_error: t("NAME_EMPTY") })
        .min(MIN_TAG_NAME_LENGTH, { message: ADD_TAG_NAME_LENGTH })
        .max(MAX_TAG_NAME_LENGTH, { message: ADD_TAG_NAME_LENGTH }),
      color: z
        .string({ required_error: t("COLOR_EMPTY") })
        .min(TAG_COLOR_LENGTH, { message: t("ADD_TAG_COLOR_EMPTY") })
        .max(TAG_COLOR_LENGTH, { message: t("ADD_TAG_COLOR_EMPTY") }),
    })
    .refine((data) => isTagUnique(data.name, data.color, tags), {
      message: t("ADD_TAG_ALREADY_EXIST"),
      path: ["name"],
    });

  const formTag = useForm<z.infer<typeof formSchemaTag>>({
    resolver: zodResolver(formSchemaTag),
    defaultValues: {
      name: "",
      color: "",
    },
  });

  async function onSubmitTag(values: z.infer<typeof formSchemaTag>) {
    let colorTag = values.color;
    if (values.name.toLowerCase() === "revolvair") {
      colorTag = "8ec7f5";
    }
    const { color, ...restValues } = values;
    const updatedDefaultValues = {
      ...restValues,
      hexColor: colorTag,
    };

    await createTag(updatedDefaultValues).then((result) => {
      if (!result.success && result.message)
        toast(t(result.message.message, result.message.options));
      if (result.success && result.data) {
        dispatch(addTag(result.data));
        setOpen(false);
        formTag.reset();
        toast(t("CREATE_API_SUCCESS"));
      }
    });
  }

  const colors = [
    "FAEDCB",
    "C9E4DE",
    "C6DEF1",
    "DBCDF0",
    "F2C6DE",
    "F7D9C4",
    "FFADAD",
    "FDFFB6",
    "F7F5EB",
    "C4B7BB",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"blue"} size={"sm"} className="mx-2 my-1">
          {t("ADD_TAG")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <FormTitle title={t("ADD_TAG")} description={t("ADD_TAG_DESCRIPTION")} />
        <Form {...formTag}>
          <form key={1}>
            <div className="space-y-5">
              <FormField
                control={formTag.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("NAME_LABEL")}</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder={t("NAME_LABEL")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Popover>
                <PopoverTrigger className="flex flex-col gap-4">
                  <div className="flex flex-row items-center">
                    {t("ADD_TAG_COLOR_PICKER_LABEL")}
                    <span className="material-symbols-outlined text-_blackText dark:text-_whiteText ms-1 text-[1.2rem]">
                      colorize
                    </span>
                  </div>
                  <div
                    className="w-8 h-8 hover:cursor-pointer"
                    style={{ background: "#" + selectedColor }}
                  ></div>
                </PopoverTrigger>
                <PopoverContent side="right">
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <div
                        onClick={() => {
                          setSelectedColor(color);
                          formTag.setValue("color", color);
                        }}
                        className="w-8 h-8 hover:cursor-pointer"
                        style={{ background: "#" + color }}
                      ></div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <FormField
                control={formTag.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="hidden">{t("COLOR_LABEL")}</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-slate-300 hidden"
                        type="text"
                        placeholder={t("COLOR_LABEL")}
                        {...field}
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <div>
          <Button
            variant={"blue"}
            className="float-end mt-2"
            onClick={formTag.handleSubmit(onSubmitTag)}
          >
            {t("CONFIRM_BUTTON_TEXT")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
