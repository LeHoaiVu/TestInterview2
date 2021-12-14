import React from 'react'

function MyPagination(props) {
    const { page, totalPages, onChange } = props

    const buttonStyle = {
        width: 25,
        height: 25,
        fontSize: 13,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0.3em',
        margin: '0 0.3em',
        cursor: 'pointer',
    }

    const activeButtonStyle = {
        border: '0.1em solid #007bff',
    }

    const disableButtonStyle = {
        border: '0.1em solid #f1f1f1',
        backgroundColor: '#f1f1f1',
    }

    const iconStyle = {
        width: 24,
        height: 24,
        objectFit: 'contain',
    }

    return (
        <div style={{ display: 'flex'}}>
            <div
                style={{
                    ...buttonStyle,
                    ...(page > 1 ? activeButtonStyle : disableButtonStyle),
                }}
                onClick={() => (page > 1 ? onChange(page - 1) : null)}
            >
                <img
                    alt=""
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Angle_left_font_awesome.svg"
                    style={iconStyle}
                />
            </div>
            <div
                style={{
                    ...buttonStyle,
                    ...(page !== 1 ? activeButtonStyle : disableButtonStyle),
                }}
                onClick={() => (page !== 1 ? onChange(1) : null)}
            >
                1
            </div>
            <div style={buttonStyle}>...</div>
            <div
                style={{
                    ...buttonStyle,
                    ...(page !== totalPages ? activeButtonStyle : disableButtonStyle),
                }}
                onClick={() => (page !== totalPages ? onChange(totalPages) : null)}
            >
                {totalPages}
            </div>
            <div
                style={{
                    ...buttonStyle,
                    ...(page < totalPages ? activeButtonStyle : disableButtonStyle),
                }}
                onClick={() => (page < totalPages ? onChange(page + 1) : null)}
            >
                <img
                    alt=""
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Angle_right_font_awesome.svg"
                    style={iconStyle}
                />
            </div>
        </div>
    )
}

export default MyPagination
