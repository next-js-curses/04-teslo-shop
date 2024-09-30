interface Props {
  params: {
    id: string
  }
}

export default function Category({ params }: Readonly<Props>) {
  return (
    <div className="">
      <h1>Category Page: {params.id}</h1>
    </div>
  );
}
