import React from "react";

const AppLoader = ()=>{
    return (
        <div className="loader" data-testid="spinner" aria-live="assertive">
            <div className="spinner"/>
            <p>Loading projects...</p>
        </div>
    );
}

export default AppLoader;