"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { FC } from "react";

// Lazy loading the import, ssr: false will disable server-rendering
const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false
  }
);

interface EditorOutputProps {
  content: any;
}

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      className="text-sm"
      renderers={renderers}
      style={style}
      data={content}
    />
  );
};

// Custom code renderer to optimize performance and style
function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="bg-neutral-600 rounded-md p-4">
      <code className="text-gray-100 text-sm">{data.code}</code>
    </pre>
  );
}

// Custom image renderer to optimize performance and style
function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[15rem]">
      <Image alt="Main Post Image" className="object-contain" fill src={src} />
    </div>
  );
}

export default EditorOutput;
