import Image from "next/image"
import {
  PortableTextReactComponents,
  PortableTextMarkComponentProps,
  PortableTextTypeComponentProps,
} from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"

type LinkMark = {
  _type: "link"
  href: string
  blank?: boolean
}

type ImageType = {
  _type: "image"
  asset?: any
  alt?: string
}

export const PortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: PortableTextTypeComponentProps<ImageType>) => {
      const src = value.asset ? urlFor(value.asset).url() : "/placeholder.svg"
      return (
        <Image
          src={src}
          alt={value.alt || "Image"}
          className="my-12 w-full rounded object-cover"
          width={800}
          height={600}
        />
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="font-figtree mb-8 text-4xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="font-figtree mb-6 text-3xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="font-figtree mb-5 text-2xl font-semibold">{children}</h3>,
    h4: ({ children }) => <h4 className="font-figtree mb-5 text-xl font-semibold">{children}</h4>,
    normal: ({ children }) => <p className="mb-6">{children}</p>,
  },
  list: {
    bullet: (props) => <ul className="mb-6 ml-5">{props.children}</ul>,
    number: (props) => <ol className="mb-6 ml-5">{props.children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-3 list-disc pl-2">{children}</li>,
    number: ({ children }) => <li className="mb-3 list-decimal pl-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps<LinkMark>) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        className="text-blue-600 underline hover:text-blue-800"
      >
        {children}
      </a>
    ),
  },
}
