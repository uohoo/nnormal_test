import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { shoeById, shoes } from "@/data/shoes";
import { ModelDetailView } from "@/components/ModelDetailView";

type ModelPageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const shoe = shoeById.get(params.id);
  if (!shoe) {
    return { title: "Model no trobat" };
  }

  return {
    title: `${shoe.name} | NNormal Finder`,
    description: shoe.description
  };
}

export function generateStaticParams() {
  return shoes.map((shoe) => ({ id: shoe.id }));
}

export default function ModelPage({ params }: ModelPageProps) {
  const shoe = shoeById.get(params.id);

  if (!shoe) {
    notFound();
  }

  return <ModelDetailView shoe={shoe} />;
}
