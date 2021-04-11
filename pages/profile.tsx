const Navbar = () => {
  return <div className="flex items-center mb-10">
    <img className="h-10" src="image/nft_pass_logo.png" alt=""/>
    <div className="flex-grow"/>
    <div className="p-1 bg-white rounded-full shadow-nft" >
      <button className="py-2 text-sm rounded-full text-black px-5">Discovery</button>
      <button className="py-2 text-sm rounded-full bg-black text-white px-5">Your Page</button>
    </div>
    <div className="flex-grow"/>
    <img className="h-12 w-12 rounded-full border-4 border-white shadow-nft" src="image/beeple_profile.png" alt=""/>
  </div>
}

const CurrentNFT = () => {
  return <div className="m-auto rounded-16 mt-4 mb-6 bg-white shadow-nft p-4 flex" style={{width: '84%'}}>
    <img src="image/nft_image_1.png" className="h-24 w-24 rounded-lg" alt=""/>
    <div className="ml-8 flex-grow">
      <p className="text-sm">
        <span className="text-green-500 mr-2">▲2.3%</span>
        Bid placed at
      </p>
      <p>April 3, 2021 at 2:06am</p>
      <a href="/" className="inline-block mt-6 text-gray-500 underline">see current bidding</a>
    </div>
    <div className="text-right">
      <img src="image/rarible_icon.png" className="inline h-8"/>
      <div className="text-xl font-semibold mt-1">3 ETH</div>
      <div className="text-sm">$2000</div>
    </div>
  </div>
}

const Page = () => {
  return  <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")'}}>
    <div className="w-4/5 m-auto z-10">
      <Navbar />
      {/* container */}
      <div className="rounded-24 border border-white shadow-nft">
        <div
          className="h-32 flex justify-end items-center px-16"
          style={{borderRadius: '24px 24px 0 0', background: '#d2cdcd26'}}>
          <button className="bg-white rounded-full p-2 px-3 flex items-center shadow-nft">
            <img src="image/edit_icon.png" className="inline h-6" />
            <span className="ml-2 font-thin text-sm">Edit</span>
          </button>
        </div>

        <div className="bg-white pt-24" style={{borderRadius: '0px 0px 24px 24px'}}>
          <div className="text-center -mt-48">
            <img
              src="image/beeple_profile.png"
              className="inline-block h-40 w-40 border-8 border-white shadow-nft rounded-28"
              alt=""/>
          </div>
          <div className="m-auto text-center mt-3">
            <div className="mb-4 text-3xl font-semibold">
              Beeple
              <img src="image/verify_logo.png" className="inline h-6 ml-2 -mt-1"/>
            </div>
            <div className="text-sm shadow-nft rounded-full bg-white inline p-2 px-4 font-thin">
              <span>
                #9531985...nvfnv4
                <img src="image/copy_icon.png" className="inline ml-2 -mr-2 -mt-1 h-5" />
              </span>
            </div>
          </div>

          <div className="flex m-auto justify-center mt-10">
            <div className="px-6">
              <p className="text-sm font-thin">
                Twitter
                <img src="image/correct_icon.png" alt="" className="inline h-3 ml-1 -mt-1"/>
              </p>
              <p className=" text-xl font-semibold">593k Followers</p>
            </div>
            <div className="border-l-4 px-6">
              <p className="text-sm font-thin">
                Instagram
                <img src="image/correct_icon.png" alt="" className="inline h-3 ml-1 -mt-1"/>
              </p>
              <p className=" text-xl font-semibold">2M Followers</p>
            </div>
            <div className="border-l-4 px-6">
              <p className="text-sm font-thin">
                Supporters
              </p>
              <p className=" text-xl font-semibold">40 Collectiors</p>
            </div>
          </div>

          <div className="text-center text-gray-500 text-xl mt-8 mb-6">
            Current Bidding
          </div>

          <div className="w-full">
            <CurrentNFT />
            <CurrentNFT />
            <CurrentNFT />
          </div>

          <div className="text-center">
            <a className="text-xl underline text-gray-400 font-thin" href="/">See more</a>
          </div>
          <div className="h-16"/>
        </div>
      </div>

      <div className="h-10"/>
    </div>
  </div>
}

export default Page
