import React, { useState } from 'react'

const PostalCodePicker = ({ suggestions, onSelect }: any) => {

    const [loading, setLoading] = useState(false)


    return (
        <div className='mt-0'>
                <div className="autocomplete-dropdown-container" style={{ textAlign: 'left' }}>
                    {loading && <div>Searching...</div>}
                    {suggestions?.[0]?.address_components?.map((suggestion: any, index:number) => {
                        const className = 'my-1 py-2 border suggestion-item rounded ';
                        const style = { backgroundColor: "#fafafa", cursor: "pointer" }
                        return (
                            <div
                                key={suggestion?.long_name}
                                // value={suggestion.long_name}
                                className={className}
                                style={style}
                                onClick={() => onSelect(suggestion)}
                            >
                                <span className='px-4'>{suggestion?.long_name}{suggestion?.types?.length > 0 && ', '}
                                 <span style={{ textTransform: 'capitalize'}}>{suggestion?.types?.[0]?.replace(/_/g, ' ')}</span>
                                </span>
                            </div>
                        );
                    })}
                </div>
                
        </div>
    )
}

export default PostalCodePicker
