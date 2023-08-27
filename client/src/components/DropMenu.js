// DropdownMenu.js
import React from 'react';
import { DomainContext } from '../contexts/domains';
import { useContext } from 'react';
import { FormGroup, Label } from 'reactstrap'
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    form: {
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      width:'35%',
      '@media (max-width: 700px)': {
        display: 'none',
      }
    },
    menu: {
        width: '100%',
        fontSize: '1.2em',
        padding: 5,
        borderRadius: 5,
        border: 0,
        cursor: 'pointer',
        '&:hover': {
            border: "2px solid #191970"
        },
        '@media (max-width: 700px)': {
          display: 'none',
        }

    },
    option: {
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    label: {
      fontSize: '1.2em', 
      color: '#191970', 
      fontFamily: 'Gill Sans', 
      fontWeight: 'bold',
      '@media (max-width: 700px)': {
        display: 'none',
        width: 0
      },
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
        <FormGroup className={classes.form}>
        <Label for="domain" className={classes.label}>Scraped Domains:</Label>
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
