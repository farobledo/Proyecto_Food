import React from "react";
import "../css/Page.css";

export default function Page({ recipesPerPage, allRecipes, paginado }) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav className="BackGraund_Pagination">
      <ul className="ul_pagiation">
        {pageNumber?.map((number) => (
          <li className="li" key={number}>
            <button className="a" onClick={() => paginado(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
