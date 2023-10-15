import React from 'react';

function EmbeddedPage() {
    return (
        <div>
            <h1>Embedded Page</h1>
            <iframe
                src="http://127.0.0.1:1338"
                width="100%"
                height="500px"
                title="Embedded Page"
            />
        </div>
    );
}

export default EmbeddedPage;
