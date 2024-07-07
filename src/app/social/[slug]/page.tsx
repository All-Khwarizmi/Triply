import { getItem } from "@/actions/get-item";
import React, { Suspense } from "react";
import { EditorClient } from "./EditorClient";
import { Loader } from "lucide-react";

async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const item = await getItem(params.slug);

  if (!item) {
    return (
      <div className="text-center text-gray-500 text-xl">No trip found</div>
    );
  }
  // Serialization error happening when trying to handle the data transformation in server and pass it to client. "Only plain objects can be passed to Client Components from Server Components". And since we're dealing with a class (NodeList), we can't pass it to the client. So we need to create a new component to handle the data transformation in the client.
  return (
    <Suspense fallback={<Loader className="mx-auto animate-spin" size={48} />}>
      <EditorClient
        id={item.data.id}
        name={item.data.name}
        trip={item.data.trip}
      />
    </Suspense>
  );
}

export default Page;
