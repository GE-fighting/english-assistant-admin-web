import { redirect } from "next/navigation";

//访问这个页面自动跳转到/dashboard/textbooks/manage
export default function Textbooks() {
  redirect("/dashboard/textbooks/manage");
}
