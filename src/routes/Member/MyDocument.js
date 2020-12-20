import React, { PureComponent } from "react";
import { Button } from "antd";

import jsPDF from "jspdf";

export default class MyDocument extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      people: [
        { name: "Keanu Reeves", profession: "Actor" },
        { name: "Lionel Messi", profession: "Football Player" },
        { name: "Cristiano Ronaldo", profession: "Football Player" },
        { name: "Jack Nicklaus", profession: "Golf Player" }
      ]
    };
  }

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [["NAME", "PROFESSION"]];

    const data = this.state.people.map(elt => [elt.name, elt.profession]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  // JSpdf Generator For generating the PDF
  jsPdfGenerator = () => {
    // Example From https://parall.ax/products/jspdf
    var doc = new jsPDF("p", "pt");

    doc.text(20, 20, "This is the default font.");

    doc.setFont("courier");
    doc.setFontType("normal");
    doc.text(20, 30, "This is courier normal.");

    doc.setFont("times");
    doc.setFontType("italic");
    doc.text(20, 40, "This is times italic.");

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.text(20, 50, "This is helvetica bold.");

    doc.setFont("courier");
    doc.setFontType("bolditalic");
    doc.text(20, 60, "This is courier bolditalic.");

    // Save the Data
    doc.save("Generated.pdf");
  };

  render() {
    return (
      <Button onClick={this.exportPDF} type="primary">
        {" "}
        Generate PDF{" "}
      </Button>
    );
  }
}
