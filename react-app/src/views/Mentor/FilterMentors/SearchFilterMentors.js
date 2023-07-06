import React, {useState} from 'react'
import ItemForm from "../../../Auth/ItemForm";



function SearchFilterMentors(props) {

    return (
        <div className="input-row">
            <ItemForm type="text" name="search" value="fgfgfgfg"data-testid="filter-input-search"
                    placeholder="Mot clé" />
        </div>
    )
}

export default SearchFilterMentors