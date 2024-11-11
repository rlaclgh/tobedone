"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUp } from "../_apis/auth";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "올바른 이메일을 입력해주세요.",
    })
    .email("올바른 이메일을 입력해주세요."),
  password: z.string().min(2, {
    message: "올바른 비밀번호를 입력해주세요.",
  }),
});

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await signUp(values);

    if (result.code === "SUCCESS") {
      toast({
        title: "회원가입완료",
        description: "회원가입이 완료되었습니다.",
      });

      router.replace("/sign-in");
    }

    if (result.code === "FAIL") {
      if (result.message === "이미 가입한 유저입니다.") {
        toast({
          variant: "destructive",
          title: "회원가입실패",
          description: "이미 가입한 회원입니다.",
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="이메일" {...field} />
              </FormControl>
              <FormDescription>이메일을 입력해주세요.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="비밀번호" {...field} />
              </FormControl>
              <FormDescription>비밀번호를 입력해주세요.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-center justify-center">
          <Button type="submit" className="min-w-24">
            회원가입
          </Button>
        </div>
        <Button
          variant="link"
          className="w-full flex items-center justify-center"
        >
          <Link href="/sign-in">이미 계정이 있나요? 로그인하기</Link>
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
