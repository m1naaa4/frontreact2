import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import '../../taginput.css'




export default function InputTags({selectedTags, tagss}) {
    const dispatch = useDispatch();
    const [tags, setTags] = useState(tagss);

    useEffect(() => {
        setTags(tagss ?? []);
    }, [tagss]);

    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        selectedTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    return (
        <div className="tags-input">
            <ul id="tags">
                {tags && tags.map((tag, index) => (
                    <li key={index} className="tag">
                        <span className='tag-title'>{tag}</span>
                        <span className='tag-close-icon'
                              onClick={() => removeTags(index)}>
                            x
                        </span>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                onKeyDown={event => event.keyCode === 13 ? addTags(event) : null}
                placeholder="Add Tags(Press enter to add)"
            />
        </div>
    );
};