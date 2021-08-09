import React, { useState } from 'react'
import { Profile } from '../method/rarible/interface'
import { sanitizeArray } from '../method/integrate'
import { walletStore } from 'stores/wallet.store'
import Icon from '@/Icon'
import DragContainer from '@/DragContainer'
import { CreatorHeader, ShareAction, UpdateAction } from '@/Galleryst'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { faBars } from '@fortawesome/free-solid-svg-icons'

const reorder = (list: any[], result: any) => {
  const { source: {index: startIndex} , destination: { index: endIndex}  } = result
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

// const collections = [
//   {
//     id: '1',
//     name: 'Section Name A',
//     nftLists: [
//       '0x495f947276749ce646f68ac8c248420045cb7b5e:16976656776706765530295069378589593134240473939110652115433670303152255008769',
//       '0x495f947276749ce646f68ac8c248420045cb7b5e:46905774196076978444661487214213912824913932688747063206663029721211273740289',
//       '0xd07dc4262bcdbf85190c01c996b4c06a461d2430:541393'
//     ]
//   },
//   { id: '2', name: 'Section Name B', nftLists: []}
// ]

const ProfilePage = ({profile, action, lists, claimStage = false, setClaimStage }: {
  profile: Profile,
  action: any,
  lists: any,
  claimStage: boolean
  setClaimStage: any
}) => {
  const { onsaleLists, ownLists, createdLists, dropLists, NFTLists } = lists
  const parcel = {
    profile: { ...profile, verified: true },
    NFTLists: sanitizeArray(NFTLists),
    onsaleLists,
    ownLists,
    createdLists,
    dropLists
  }
  const wallet = walletStore
  const address = profile.address
  const claimCheck = address == wallet?.address
  const [ sections , setSection] = useState<any[]>([])
  const [ newSectionName, setName] = useState('')
  const onDragEnd = (result: any, lists: any[]) => {
    if (!result.destination) return
    const items = reorder( lists, result )
    setSection(items)
  }
  const newSection = () => {
    if(newSectionName != ''){
      setSection([ ...sections , { id: newSectionName, name: newSectionName, nftLists: []}])
      setName('')
    }
  }
  const removeSection = (id: string) => {
    const filtered = sections.filter((section: any) => section.id != id)
    setSection(filtered)
  }
  return <div className="md:w-4/5 w-full m-auto z-10 relative">
    <UpdateAction profile={profile} action={action} />
    {profile.shortUrl && <ShareAction gallerystID={profile.shortUrl != undefined ? `${profile.shortUrl}` : `profile?address=${profile.address}`} />}
    <div className="rounded-24 border border-white shadow-nft mt-20 mb-20 pb-10" style={{ background: 'rgba(185, 184, 184, 0.32)', borderRadius: '24px' }}>
      <div className="bg-white" style={{ borderRadius: '24px 24px 0px 0px' }}>
        <div className="text-center">
          <CreatorHeader claimStage={claimStage} setClaimStage={setClaimStage} profile={profile} parcel={parcel} claimable={claimCheck} />
        </div>
      </div>

      {/* Gallery */}
      <div className="lg:w-1/2 m-auto bg-white block p-10 mt-10 rounded-xl">
        <div className="flex items-center">
          <div className="flex-grow text-lg font-bold">Customize my page</div>
          {/* <span className="shadow-nft bg-white inline-block rounded-full flex items-center h-8 px-4">
            <Icon noMargin fill={faTimes} />
          </span> */}
        </div>
        <div className="bg-white shadow-nft rounded-2xl p-3 mt-4">
          <h3 className="mb-3 font-semibold">Section Name</h3>
          <input onChange={e => setName(e.target.value)} value={newSectionName} className="outline-none block bg-white rounded-full p-3 shadow-nft w-full" type="text" placeholder="My Top Fav NFT" />
          <button onClick={() => newSection() } className="button-red rounded-full mt-4 p-3 w-full font-semibold">+ Add</button>
        </div>
        <DragDropContext onDragEnd={(e) => onDragEnd(e, sections)}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full inline"
              >
                {sections.map((item, index) => {
                  const { id, name, nftLists } = item
                  const filters: any[] = (nftLists != undefined && nftLists.length > 0) ? NFTLists.filter((nft: any) => nftLists.indexOf(nft.id) != -1 ) : []
                  return <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div className="bg-gray-100 shadow-nft rounded-2xl p-3 mt-4 w-full"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <div className="flex items-center justify-center mb-3">
                          <Icon fill={faBars} />
                          <h3 className="flex-grow font-semibold">{name}</h3>
                          { filters.length > 0 && <button className="underline outline-none mr-3">Edit</button>}
                          <button onClick={() => removeSection(id)} className="underline outline-none">Remove</button>
                        </div>
                        { filters.length > 0 ?
                          <DragContainer lists={filters} />:
                          <button className="outline-none w-full h-32 font-bold text-gray-600 ove bg-gray-300 rounded-xl border-gray-500 border-dashed border-2 p-4">Add NFT +</button>
                        }
                      </div>
                    )}
                  </Draggable>
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Footer */}
      <div className="text-white text-center text-sm mt-8">© 2021 Galleryst.co, All rights reserved.</div>
    </div>
    <a href={`https://galleryst.hellonext.co`} className="fixed right-0 bottom-0 z-20 my-2 mx-4 w-auto inline bg-white text-gray-700 focus:outline-none rounded-full p-2 items-center shadow-nft text-xs" target="_blank" ><img src="/image/feedback_icon.svg" style={{ height: '20px', opacity: '.6' }} className="inline-block mr-2 mb-0 " />Send us feedback</a>
  </div>

}

export default ProfilePage
