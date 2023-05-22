import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default function SearchComponent() {
  const navigate = useNavigate();
  const [searchQuery, seSearchQuery] = useState("");
  const formSubmitAction = (e) => {
    e.preventDefault();
    navigate(searchQuery ? `/filters/?query=${searchQuery}` : "/filters");
  };

  return (
    <Form className="search-form" onSubmit={formSubmitAction}>
      <InputGroup>
        <FormControl className="input-search-product"
          type="text"
          name="q"
          id="q"
          onChange={(e) => seSearchQuery(e.target.value)}
          placeholder="SEARCH"
          autoComplete="off"
        ></FormControl>
      </InputGroup>
    </Form>
  );
}
