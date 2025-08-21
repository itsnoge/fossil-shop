import { type SchemaTypeDefinition } from "sanity"

import { blockContentType } from "./blockContentType"
import { categoryType } from "./categoryType"
import { postType } from "./postType"
import { authorType } from "./authorType"
import { localeString } from "./localeStringType"
import { productCategoryType } from "./productCategoryType"
import { productType } from "./productType"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    localeString,
    productCategoryType,
    productType,
  ],
}
