"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTodo } from "../_apis/todo";
import { useToast } from "@/hooks/use-toast";
import { Dispatch, SetStateAction } from "react";

interface AddTodoFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "올바른 제목을 입력해주세요.",
  }),
  link: z
    .string()
    .regex(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
      "올바른 링크를 입력해주세요."
    ),
});

const AddTodoForm = (props: AddTodoFormProps) => {
  const { setIsOpen } = props;
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      link: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createTodo(values);

    if (result.code === "SUCCESS") {
      toast({
        title: "Todo 생성완료",
        description: "Todo를 생성했습니다.",
        duration: 1000,
      });
      setIsOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="제목" {...field} />
              </FormControl>
              <FormDescription>제목을 입력해주세요.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>링크</FormLabel>
              <FormControl>
                <Input placeholder="링크" {...field} />
              </FormControl>
              <FormDescription>링크를 입력해주세요.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-center justify-center">
          <Button type="submit" className="min-w-24">
            생성하기
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddTodoForm;
