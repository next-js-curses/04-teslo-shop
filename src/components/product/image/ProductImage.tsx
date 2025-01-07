import Image from 'next/image'

interface Props {
  src?: string
  alt: string
  width: number
  height: number
  className: React.StyleHTMLAttributes<HTMLImageElement>['className']
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style']
}

export const ProductImage = ({ src, alt, className, style, width, height }: Readonly<Props>) => {
  return (
    <Image
      src={ srcBuilder(src) }
      alt={ alt }
      width={ width }
      height={ height }
      className={ className }
      style={ style }
    />
  )
}

const srcBuilder = (src?: string): string => {
  if (src) {
    return src.startsWith('http')
      ? src
      : `/products/${src}`
  }
  return '/imgs/placeholder.jpg'
}