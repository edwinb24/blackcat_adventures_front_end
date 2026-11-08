'use client'

// Shows when the root layout fails (for example, the header or footer data
// does not load). It replaces the layout, so it has its own <html> and <body>.
const GlobalError = ({reset}: {reset: () => void}) => {
    return (
        <html lang='en'>
            <body
                style={{
                    backgroundColor: '#0e0c0c',
                    color: '#fefefe',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    textAlign: 'center',
                    padding: '40px 20px',
                }}
            >
                <h1>Sorry, Black Cat Adventures could not load.</h1>
                <button
                    type='button'
                    onClick={reset}
                    style={{marginTop: '20px', padding: '10px'}}
                >
                    Try again
                </button>
            </body>
        </html>
    )
}

export default GlobalError
