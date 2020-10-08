import React, { Component } from 'react'
 function addTable() {
            // $.get("http://localhost:8080/api/tdnames/", function (
            //     data,
            //     status
            // ) {

            //      row = data.length;
            // });
            // $.get("http://localhost:8080/api/tdfillers/", function (
            //     data,
            //     status
            // ) {

            //      column = data.length;


            // });

            var myTableDiv = document.getElementById("myDynamicTable");

            var table = document.createElement('TABLE');
            table.border = '1';

            var tableBody = document.createElement('TBODY');
            table.appendChild(tableBody);

            for (var i = 0; i < row; i++) {
                var tr = document.createElement('TR');
                tableBody.appendChild(tr);
                var tdName = document.createElement('TD');
                tdName.innerHTML = "Name _ " + i;
                tr.appendChild(tdName);
                for (var j = 1; j < coulmn; j++) {
                    var td = document.createElement('TD');
                    td.width = '88';
                    td.appendChild(document.createTextNode("Cell " + i + "," + j));
                    td.innerHTML = '<input type="button" value = "-" onclick="func()" id="' + 'mins_r-' + i + '-c-' + j + '">';
                    td.innerHTML = td.innerHTML + '<input type="text" size = "1" value="0" id="' + 'text_r-' + i + '-c-' + j + '">';
                    td.innerHTML = td.innerHTML + '<input type="button" value = "+"  onclick="func()" id="' + 'plus_r-' + i + '-c-' + j + '">';
                    tr.appendChild(td);

                }
            }
            myTableDiv.appendChild(table);

        }

        function load() {

            console.log("Page load finished");
        }
        function func() {
            var str = event.srcElement.id;
            var callingFuncName = str.substring(0, 4);
            var idTextBox = "";
            if (callingFuncName == "mins") {
                idTextBox = str.replace("mins", "text");
                var strCount = ""
                strCount = document.getElementById(idTextBox).value;
                intCount = parseInt(strCount);
                if (intCount > 0) {
                    intCount = intCount - 1;
                }
                document.getElementById(idTextBox).value = intCount;
            }
            else {
                idTextBox = str.replace("plus", "text");
                var strCount = ""
                strCount = document.getElementById(idTextBox).value;
                intCount = parseInt(strCount);
                intCount = intCount + 1;
                document.getElementById(idTextBox).value = intCount;


            }
            //alert("text box ID - " + idTextBox);



        }
export default class table extends Component {
  render() {
    return (
      <div>
        <body onload="load()">
    <div className="myDynamicTable">
        <input type="button" id="create" value="Click here" onclick="Javascript:addTable(row = '3', coulmn = '9')">
        to create a Table and add some data using JavaScript
    </div>
   
</body>
      </div>
    )
  }
}




