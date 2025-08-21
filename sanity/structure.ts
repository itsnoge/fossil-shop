import type { StructureResolver } from "sanity/structure"
import { DocumentTextIcon, TrolleyIcon } from "@sanity/icons"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Blog")
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("Shop")
        .icon(TrolleyIcon)
        .child(
          S.list()
            .title("Shop")
            .items([
              S.documentTypeListItem("product").title("Products"),
              S.documentTypeListItem("productCategory").title("Categories"),
            ]),
        ),
    ])
