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
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "../_apis/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { setAuthToken } from "../_utils/cookie";

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

const SignInForm = () => {
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
    const result = await signIn(values);

    if (result.code === "SUCCESS") {
      toast({
        title: "로그인 완료",
        description: "로그인이 완료되었습니다.",
      });

      await setAuthToken(result.data?.accessToken as string);

      router.replace("/");
    }

    if (result.code === "FAIL") {
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: "로그인 정보를 확인해주세요.",
      });
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
            로그인
          </Button>
        </div>
        <Button
          variant="link"
          className="w-full flex items-center justify-center"
        >
          <Link href="/sign-up">계정이 없으신가요? 간편가입하기</Link>
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
