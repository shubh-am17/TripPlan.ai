import React from 'react';

function Options({ array, selectedOptions, setSelectedOptions }) {
  const changeStyle={
    background: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255,0.6)',
    color: 'black'
  }
  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));

    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className='options'>
    
        {array.map((option) => (
          <button
            className='option'
            key={option}
            style={selectedOptions.includes(option) ? changeStyle : null}
            onClick={() => handleOptionClick(option)}
            // Call handleOptionClick with the specific option when the button is clicked
          >
            {option}
          </button>
        ))}
      
    </div>
  );
}

export default Options;
