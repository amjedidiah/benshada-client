import React, { Component } from "react";
import MultiSelect from "./MultiSelect/MultiSelect";

export default class Categories extends Component {
  render() {
    return (
      <>
        <MultiSelect
          title="categories"
          availableOptions={[
            { name: "ankara" },
            { name: "adire" },
            { name: "agbada" },
            { name: "bags" }
          ]}
          selectedOptions={[
            { name: "ankara" },
            { name: "adire" },
            { name: "agbada" }
          ]}
        />
      </>
    );
  }
}
