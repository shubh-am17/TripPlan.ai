import React from 'react'

function DropDown({array, selectedOption, setSelectedOption}) {
    const handleOptionClick = (event) => {
        event.preventDefault();
        const option = event.target.value;
        setSelectedOption(option);
    };
  return (
    <div>
        <select id='optionDown'
        value={selectedOption}
            onChange={handleOptionClick}
        >

            {array.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default DropDown