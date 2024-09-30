interface Props {
  params: {
    slug: string
  }
}

export default function Product({ params }: Readonly<Props>) {
  return (
    <div className="">
      <h1>{`Product -> ${params.slug}`}</h1>
    </div>
  );
}
