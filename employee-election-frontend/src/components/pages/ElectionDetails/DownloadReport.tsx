import React from "react";
import { Button } from "@mantine/core";
import { jsPDF } from "jspdf";

interface StatCard {
  title: string;
  value: string | number;
}

interface WinnerDetail {
  title: string;
  value: string | number;
}

interface ColumnData {
  title: string;
  field: string;
}

interface DownloadReportButtonProps {
  StatCards: StatCard[];
  resultsColData: ColumnData[];
  resultsRowData: Record<string, any>[];
  winnerDetails: WinnerDetail[];
}

const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({
  StatCards,
  resultsColData,
  resultsRowData,
  winnerDetails,
}) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title: Election Report
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Election Report", 20, 20);

    // Add StatCards data
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    let yOffset = 30;

    StatCards.forEach((card) => {
      doc.text(`${card.title}: ${card.value}`, 20, yOffset);
      yOffset += 10;
    });

    yOffset += 10;

    // Add Winner Details title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Winner Details", 20, yOffset);
    yOffset += 10;

    // Add Winner Details data
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    winnerDetails.forEach((item) => {
      doc.text(`${item.title}: ${item.value}`, 20, yOffset);
      yOffset += 10;
    });

    // Create table data
    const headers = resultsColData.map((col) => col.title);

    // Create table body with proper data formatting
    const tableData = resultsRowData.map((row) => {
      return resultsColData.map((col) => {
        const value = row[col.field];
        // Ensure all values are strings and handle null/undefined
        return value != null ? String(value) : "";
      });
    });

    // Add the table
    yOffset += 10;
    const startX = 20;
    const cellWidth = 40;
    const cellHeight = 10;

    // Draw headers
    doc.setFont("helvetica", "bold");
    headers.forEach((header, i) => {
      doc.text(String(header), startX + i * cellWidth, yOffset);
    });

    // Draw table body
    doc.setFont("helvetica", "normal");
    tableData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        doc.text(
          String(cell),
          startX + colIndex * cellWidth,
          yOffset + (rowIndex + 1) * cellHeight
        );
      });
    });

    // Save the generated PDF
    doc.save("election-report.pdf");
  };

  return <Button onClick={generatePDF}>Download Report</Button>;
};

export default DownloadReportButton;
