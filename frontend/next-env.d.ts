/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
  type SVGTitleProp = { title?: React.ReactNode }
  const type: React.ComponentType<React.SVGProps<SVGSVGElement> & SVGTitleProp>
  export default type
}
