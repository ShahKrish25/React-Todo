import React from 'react'
import Switch from './Switch'
import Delete from './Delete'


const Nav = ({ name }) => {
    return (
        <>
            <div className='flex justify-around items-center px-12 bg-amber-200'>
                <h1 className="m-auto text-3xl pt-2 pb-2 w-screen">
                    {name}'s Todo List
                </h1>
                {/* <Switch /> */}
                <Delete />
            </div>
        </>
    )
}

export default Nav
