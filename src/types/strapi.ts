// Base type for all Strapi API type
export interface StrapiBaseType<T> {
  data: {
    id: number
    attributes: T & {
      createdAt: string
      updatedAt: string
      publishedAt?: string
      locale?: string
    }
  }
  meta?: Record<string, string>
}
type StrapiMediaFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
};

export type StrapiMediaComponent = StrapiBaseType<{
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats?: {
    small?: StrapiMediaFormat
    thumbnail?: StrapiMediaFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string
  provider: string
  provider_metadata: null
}>
