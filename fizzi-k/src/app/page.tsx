import { type Metadata } from "next";

import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

const SLICE_ORDER = ["hero", "sky_dive", "carousel", "alternating_text", "big_text"];

export default async function Home() {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  const slices = [...home.data.slices].sort(
    (a, b) => SLICE_ORDER.indexOf(a.slice_type) - SLICE_ORDER.indexOf(b.slice_type),
  );

  return <SliceZone slices={slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}
