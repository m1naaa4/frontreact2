import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import '../../taginput.css'




const InputTags = props => {
    const dispatch = useDispatch();
    const [tags, setTags] = useState(props.tags);

    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        dispatch({type:'TAG', res : [...tags.filter((_, index) => index !== indexToRemove)]});
    };
    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    return (
        <div className="tags-input">
            <ul id="tags">
                {tags.map((tag, index) => (
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
                placeholder="Press enter to add tags"
            />
        </div>
    );
};

export default InputTags;