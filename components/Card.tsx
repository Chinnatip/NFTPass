type Props = {
  src: {
    title?: string
    price?: number
    provider?: string
    img?: string
  }
};
export default ({ src: {title , price, provider, img} }: Props) => (
  <div className="relative cursor-pointer">
    <img className="rounded-16 border-8 border-white shadow-xl"  src={img} />
    <img src={`image/${provider}_icon.png`} className="top-0 right-0 absolute h-6 mr-4 mt-4"/>
    <div className="overlay absolute bottom-0 w-full mb-3 px-4 pt-6 flex w-full">
      <div className="text-gray-400 text-sm">by {title}</div>
      <div className="flex-grow text-white font-bold text-right ">{price} ETH</div>
    </div>
  </div>
);
