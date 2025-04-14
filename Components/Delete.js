"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Delete = () => {
  const [mounted, setMounted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // for confirmation modal

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 10); // slight delay to ensure styles are ready
    return () => clearTimeout(timeout);
  }, []);

  const erase = () => {
    setShowConfirm(true); // show confirmation modal
  };

  const handleConfirm = () => {
    localStorage.setItem("mainTasks", JSON.stringify([]));
    setShowConfirm(false); // Close modal after confirmation
    window.location.reload();
  };

  const handleCancel = () => {
    setShowConfirm(false); // Close modal without erasing
  };

  return (
    <StyledWrapper className={mounted ? "visible" : "hidden"}>
      <button className="button" type="button" onClick={erase}>
        <span className="button__text">Erase All</span>
        <span className="button__icon">
          <svg
            className="svg"
            height={512}
            viewBox="0 0 512 512"
            width={512}
            xmlns="http://www.w3.org/2000/svg"
          >
            <title />
            <path
              d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
              style={{
                fill: "none",
                stroke: "#fff",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 32,
              }}
            />
            <line
              style={{
                stroke: "#fff",
                strokeLinecap: "round",
                strokeMiterlimit: 10,
                strokeWidth: 32,
              }}
              x1={80}
              x2={432}
              y1={112}
              y2={112}
            />
            <path
              d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
              style={{
                fill: "none",
                stroke: "#fff",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 32,
              }}
            />
            <line
              style={{
                fill: "none",
                stroke: "#fff",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 32,
              }}
              x1={256}
              x2={256}
              y1={176}
              y2={400}
            />
            <line
              style={{
                fill: "none",
                stroke: "#fff",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 32,
              }}
              x1={184}
              x2={192}
              y1={176}
              y2={400}
            />
            <line
              style={{
                fill: "none",
                stroke: "#fff",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 32,
              }}
              x1={328}
              x2={320}
              y1={176}
              y2={400}
            />
          </svg>
        </span>
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete all tasks?</p>
            <div className="modal-buttons">
              <button className="confirm" onClick={handleConfirm}>Yes</button>
              <button className="cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  &.hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.visible {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s ease-in;
  }

  .button {
    position: relative;
    border-radius: 6px;
    width: 150px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid #cc0000;
    background-color: #e50000;
    overflow: hidden;
  }

  .button .button__text {
    transform: translateX(35px);
    color: #fff;
    font-weight: 600;
    transition: all 0.3s;
  }

  .button .button__icon {
    position: absolute;
    transform: translateX(109px);
    height: 100%;
    width: 39px;
    background-color: #cc0000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }

  .button .svg {
    width: 20px;
    transition: width 0.3s;
  }

  .button:hover {
    background: #cc0000;
  }

  .button:hover .button__text {
    color: transparent;
  }

  .button:hover .button__icon {
    width: 148px;
    transform: translateX(0);
  }

  .button:active .button__icon {
    background-color: #b20000;
  }

  .button:active {
    border: 1px solid #b20000;
  }

  /* Modal Styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 300px;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .modal-buttons button {
    padding: 10px;
    width: 45%;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .confirm {
    background-color: #e50000;
    color: white;
  }

  .cancel {
    background-color: #ccc;
    color: black;
  }
`;

export default Delete;
