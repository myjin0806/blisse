import React from "react";
import "../styles/components/Pagination.scss";

/* 아이콘 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      {/* 처음 페이지로 */}
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>
      {/* 이전 페이지로 */}
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {/* 페이지 번호 */}
      {Array.from({ length: totalPages }, (_, i) => (
        <div
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
        >
          {i + 1}
        </div>
      ))}
      {/* 다음 페이지로 */}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      {/* 마지막 페이지로 */}
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
};

export default Pagination;
