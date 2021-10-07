import React, { useState } from "react";
import styles from "./Searchbar.module.css";

const Searchbar = ({ onSubmit }) => {
  const [searchedText, setSearchedText] = useState("");

  const onHandleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchedText);
    setSearchedText("");
  };

  const onHandleChange = (e) => {
    const value = e.target.value;
    setSearchedText(value);
  };

  return (
    <>
      <div className={styles.Searchbar}>
        <form onSubmit={onHandleSubmit} className={styles.SearchForm}>
          <button type="submit" className={styles.SearchFormButton}></button>
          <input
            type="text"
            onChange={onHandleChange}
            value={searchedText}
            name="searchedText"
            className={styles.SearchFormInput}
          />
        </form>
      </div>
    </>
  );
};

export default Searchbar;
