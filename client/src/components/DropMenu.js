// DropdownMenu.js
import React from 'react';
import { DomainContext } from '../contexts/domains';
import { useContext, useState } from 'react';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    menu: {
        width: '100%'
    }
})

const DropdownMenu = () => {
    const { urlList, changeDomain } = useContext(DomainContext)
    const classes = useStyles(); 

    const onSelect = (e) => {
        changeDomain(e.target.value)
    }

    const options = urlList.map((d) => {
        return (
          <option className="option" value={d}>
            {d}
          </option>
        )
      })

    return (
        <FormGroup>
        <Label for="domain">Scraped Domains</Label>
          <select
            className={classes.menu}
            type="text"
            name="domain"
            id="domain"
            onClick={onSelect}
          >
            {options}
          </select>
      </FormGroup>
    )
};

export default DropdownMenu;
