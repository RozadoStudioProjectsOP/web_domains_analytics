// DropdownMenu.js
import React from 'react';
import { DomainContext } from '../contexts/domains';
import { useContext } from 'react';
import { FormGroup, Label } from 'reactstrap'
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    menu: {
        width: '70%',
        fontSize: '1.2em',
        padding: 5
    },
    option: {
        fontSize: '1rem'
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
          <option className={classes.option} value={d}>
            {d}
          </option>
        )
      })

    return (
        <FormGroup style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: 200}}>
        <Label for="domain" style={{fontSize: '1.2em'}}>Scraped Domains:</Label>
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
