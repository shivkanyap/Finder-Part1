import React from 'react';
import PropTypes from 'prop-types'

const ReposItem =({repo})=>{
    return(
        <div>
            <h3 className="card">
             <a href={repo.html_url}>{repo.name}</a>
            </h3>
        </div>
    )
}
ReposItem.propTypes={
    repo:PropTypes.object.isRequired
}
export default ReposItem