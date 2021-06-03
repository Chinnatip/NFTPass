// import axios from 'axios'
// import { useState, useEffect } from 'react'

const Page = ({ address }: {address: string}) => {
  return <div>
    <div>NFT pages</div>
    <div>{address}</div>

  </div>
}

export async function getServerSideProps(context: any) {
  const { address } = context.query
  return {
    props: { address },
  }
}

export default Page
