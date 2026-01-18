import React from "react";
import logo from "../../assets/emojis/happy.svg";

type LoadingSpinnerProps = {
    size?: number;
    thickness?: number;
    color?: string;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                                  size = 32,
                                                                  thickness = 4,
                                                                  color = "#3b82f6",
                                                              }) => {
    return (
        <>
            <style>
                {`
          @keyframes spinner-rotate {
            to {
              transform: rotate(360deg);
            }
          }
        `}
            </style>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                }}
            >

                {/* Spinner */}
                <div
                    style={{
                        width: size,
                        height: size,
                        border: `${thickness}px solid rgba(0, 0, 0, 0.1)`,
                        borderTop: `${thickness}px solid ${color}`,
                        borderRadius: "50%",
                        animation: "spinner-rotate 1s linear infinite",
                        boxSizing: "border-box",
                    }}
                />
                {/* Logo */}
                <img
                    src={logo}
                    alt="logo"
                    style={{
                        width: 80,
                        height: "auto",
                    }}
                />


            </div>
        </>
    );
};
