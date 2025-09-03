import React from 'react'

interface Props {
    params: Promise<{
        projectId: string;
    }>
}

const Page = async ({ params }: Props) => {
    const {} = await params
  return (
    <div>page</div>
  )
}

export default Page