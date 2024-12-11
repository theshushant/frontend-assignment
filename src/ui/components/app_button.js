import React from "react";

const AppButton = ({
                       text,
                       onClick,
                       disabled,
                       ariaLabel,
                       testId
                   }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            data-testid={testId}
            aria-label={ariaLabel}
            aria-disabled={disabled ? "true" : "false"}
        >
            {text}
        </button>
    );
};

export default AppButton;