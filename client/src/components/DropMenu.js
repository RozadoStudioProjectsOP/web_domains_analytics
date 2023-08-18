// DropdownMenu.js
import React from 'react';
import { DomainContext } from '../contexts/domains';
import { useContext, useState } from 'react';

const DropdownMenu = () => {
    const { urlList } = useContext(DomainContext)
    console.log(urlList)

    const onChange = () => {

    }

    return (
        <div>
        </div>
    )
};

export default DropdownMenu;
