import React, { Component } from "react";
import ParticipantService from "../../services/ParticipantService";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      students: [
        { meetingID: ["firstMeet", "secondMeet", "thirdMeet"] },
        { aa: "aa", um: "um", hm: "hm", tthis: "tthis", that: "that" },
        {
          id: 1,
          name: "Wasif",
          aa: "+",
          Aa: "-",
          um: "+",
          Um: "-",
          hm: "+",
          Hm: "-",
          tthis: "+",
          This: "-",
          that: "+",
          That: "-",
        },
        {
          id: 2,
          name: "Tasif",
          aa: "+",
          Aa: "-",
          um: "+",
          Um: "-",
          hm: "+",
          Hm: "-",
          tthis: "+",
          This: "-",
          that: "+",
          That: "-",
        },
        {
          id: 3,
          name: "Ali",
          aa: "+",
          Aa: "-",
          um: "+",
          Um: "-",
          hm: "+",
          Hm: "-",
          tthis: "+",
          This: "-",
          that: "+",
          That: "-",
        },
        {
          id: 4,
          name: "Saad",
          aa: "+",
          Aa: "-",
          um: "+",
          Um: "-",
          hm: "+",
          Hm: "-",
          tthis: "+",
          This: "-",
          that: "+",
          That: "-",
        },
        {
          id: 5,
          name: "Asad",
          aa: "+",
          Aa: "-",
          um: "+",
          Um: "-",
          hm: "+",
          Hm: "-",
          tthis: "+",
          This: "-",
          that: "+",
          That: "-",
        },
      ],
    };
  }

  renderTableData() {
    //const cropStudent = students.slice(2);
    return this.state.students.slice(2).map((student, index) => {
      const {
        id,
        name,
        aa,
        Aa,
        um,
        Um,
        hm,
        Hm,
        tthis,
        This,
        that,
        That,
      } = student; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{aa}</td>
          <td>{Aa}</td>
          <td>{um}</td>
          <td>{Um}</td>
          <td>{hm}</td>
          <td>{Hm}</td>
          <td>{tthis}</td>
          <td>{This}</td>
          <td>{that}</td>
          <td>{That}</td>
        </tr>
      );
    });
  }
   renderTableHeader() {
     let header = Object.keys(this.state.students[1]);
     return header.map((key, index) => {
      return (
        <th colSpan={2}  key={index}>
          {key.toUpperCase()}{" "}
        </th>
      );
    });
   }
  render() {
    return (
      <div>
        <h1 id="title">Toast Master Table</h1>
        <table id="students">
          <tbody>
            <tr>
              <td colSpan="2" id="meetingID">
                meetingID
              </td>
              {this.renderTableHeader()}
            </tr>
            {this.renderTableData()}
          </tbody>
        </table>
        
      </div>
    );
  }
}
export default Table; //exporting a component make it reusable and this is the beauty of react
