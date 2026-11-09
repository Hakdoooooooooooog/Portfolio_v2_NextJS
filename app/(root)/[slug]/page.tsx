import { notFound, redirect } from "next/navigation";

export async function generateStaticParams() {
  return [
    { slug: "projects" },
    { slug: "skills-and-certificates" },
    { slug: "experiences" },
    { slug: "contact" },
  ];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  switch (slug) {
    case "projects":
      redirect("/#projects");
    case "skills-and-certificates":
      redirect("/#skills");
    case "experiences":
      redirect("/#experiences");
    case "contact":
      redirect("/#contact");
    default:
      notFound();
  }
}
