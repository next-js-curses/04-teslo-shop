interface Props {
  params: {
    id: string
  }
}

export default function OrderById({ params }: Readonly<Props>) {
  return (
    <div className="">
      <h1>Order by #{params.id}</h1>
    </div>
  );
}
