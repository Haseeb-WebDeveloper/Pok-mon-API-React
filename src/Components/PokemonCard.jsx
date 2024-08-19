import React from 'react'

function PokemonCard({ PokimonData }) {
    return (
        <div className=' flex flex-col gap-2 bg-white p-4 rounded shadow-inner border border-gray-300 hover:border-gray-400 ease-in-out duration-200'>
            <div>
                <img className='w-20 h-20 mx-auto drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]' src={PokimonData.sprites.other.dream_world.front_default} alt="" />
            </div>
            <h2 className='text-center md:text-[2vw] text-[6vw] font-semibold capitalize'>{PokimonData.name}</h2>
            <div className='flex items-center justify-around mx-auto px-[18px] py-[6px] font-medium bg-green-700 rounded-3xl text-white capitalize'>
                <span>{PokimonData.types.map((curType) => curType.type.name).join(", ")}</span>
            </div>
            <div id='properties' className='grid grid-cols-3 gap-y-2 py-2 items-center justify-items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-lg font-semibold'>Height:</p>
                    <span className='font-medium text-gray-700'>{PokimonData.height}</span>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-lg font-semibold'>Weight:</p>
                    <span className='font-medium text-gray-700'>{PokimonData.weight}</span>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-lg font-semibold'>Speed:</p>
                    <span className='font-medium text-gray-700'>{PokimonData.stats[5].base_stat}</span>
                </div>
            </div>

            <div id='properties' className='grid grid-cols-3 gap-y-2 items-center justify-items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-lg font-semibold'>Experience:</p>
                    <span className='font-medium text-gray-700'>{PokimonData.base_experience}</span>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-lg font-semibold'>Attack:</p>
                    <span className='font-medium text-gray-700'>{PokimonData.stats[1].base_stat}</span>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-lg font-semibold'>Abilities:</p>
                    <span className='font-medium text-gray-700'>{PokimonData.abilities
                        .map((abilityInfo) => abilityInfo.ability.name)
                        .slice(0, 1)
                        .join(", ")}</span>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard