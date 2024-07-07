import React from "react";

function page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>{params.slug}</h1>
      <p>Page</p>
    </div>
  );
}

export default page;
