import React from "react";
import { Button } from "@mantine/core";
import { jsPDF } from "jspdf";
import { DownloadReportButtonProps } from "../../../interfaces/election.interface";
import { formatDate } from "../../../common/utils";

const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({
  StatCards,
  resultsColData,
  resultsRowData,
  winnerDetails,
  empVoteList,
  electionDetails,
}) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const usableWidth = pageWidth - 2 * margin;
    let yOffset = 20;
    const lineHeight = 8;

    // Function to check if we need a new page
    const checkAndAddNewPage = (height: number) => {
      if (yOffset + height > pageHeight - margin) {
        doc.addPage();
        yOffset = margin;
        return true;
      }
      return false;
    };

    // Function to safely convert value to string
    const safeString = (value: any): string => {
      if (value === null || value === undefined) return "";
      return String(value);
    };

    // Title: Election Report
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Election Report", margin, yOffset);
    yOffset += 15;

    if (electionDetails) {
      // Add Election Details section
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Election Details", margin, yOffset);
      yOffset += 10;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      // Election ID and Title
      doc.text(
        `Election ID: ${safeString(electionDetails.election_id)}`,
        margin,
        yOffset
      );
      yOffset += lineHeight;
      doc.text(
        `Election Title: ${safeString(electionDetails.election_title)}`,
        margin,
        yOffset
      );
      yOffset += lineHeight;

      // Nomination Period
      if (electionDetails.nomination_start_date) {
        doc.text(
          `Nomination Start Date: ${
            electionDetails.nomination_start_date === "nomination start date"
              ? "nomination start date"
              : safeString(formatDate(electionDetails.nomination_start_date))
          }`,
          margin,
          yOffset
        );
      }
      yOffset += lineHeight;
      if (electionDetails.nomination_end_date) {
        doc.text(
          `Nomination End Date: ${safeString(
            formatDate(electionDetails.nomination_end_date)
          )}`,
          margin,
          yOffset
        );
      }
      yOffset += lineHeight;

      // Voting Period
      if (electionDetails.voting_start_date) {
        doc.text(
          `Voting Start Date: ${safeString(
            formatDate(electionDetails.voting_start_date)
          )}`,
          margin,
          yOffset
        );
      }
      yOffset += lineHeight;
      if (electionDetails.voting_end_date) {
        doc.text(
          `Voting End Date: ${safeString(
            formatDate(electionDetails.voting_end_date)
          )}`,
          margin,
          yOffset
        );
      }
      yOffset += lineHeight;

      // Results and Creation Details
      if (electionDetails.results_published_date) {
        doc.text(
          `Results Published Date: ${safeString(
            formatDate(electionDetails.results_published_date)
          )}`,
          margin,
          yOffset
        );
      }
      yOffset += lineHeight;

      if (electionDetails.created_at) {
        doc.text(
          `Created At: ${safeString(formatDate(electionDetails.created_at))}`,
          margin,
          yOffset
        );
        yOffset += lineHeight;
      }

      if (electionDetails.created_by_empid) {
        doc.text(
          `Created by user ID: ${safeString(electionDetails.created_by_empid)}`,
          margin,
          yOffset
        );
        yOffset += lineHeight;
      }

      if (electionDetails.created_by_name) {
        doc.text(
          `Created By user name: ${safeString(
            electionDetails.created_by_name
          )}`,
          margin,
          yOffset
        );
        yOffset += lineHeight;
      }
    }

    // Add StatCards data
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    StatCards.forEach((card) => {
      checkAndAddNewPage(lineHeight);
      doc.text(
        `${safeString(card.title)}: ${safeString(card.value)}`,
        margin,
        yOffset
      );
      yOffset += lineHeight;
    });
    yOffset += 10;

    // Add Winner Details
    checkAndAddNewPage(15);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Winner Details", margin, yOffset);
    yOffset += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    winnerDetails.forEach((item) => {
      checkAndAddNewPage(lineHeight);
      doc.text(
        `${safeString(item.title)}: ${safeString(item.value)}`,
        margin,
        yOffset
      );
      yOffset += lineHeight;
    });
    yOffset += 15;

    // First Table: Results Table
    checkAndAddNewPage(50);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Election Results", margin, yOffset);
    yOffset += 10;

    // Calculate column widths
    const colCount = resultsColData.length;
    const colWidth = usableWidth / colCount;

    // Draw Results table headers
    doc.setFontSize(12);
    resultsColData.forEach((col, index) => {
      doc.text(safeString(col.title), margin + index * colWidth, yOffset);
    });

    // Draw horizontal line under headers
    yOffset += 2;
    doc.line(margin, yOffset, pageWidth - margin, yOffset);
    yOffset += 5;

    // Draw Results table body
    doc.setFont("helvetica", "normal");
    resultsRowData.forEach((row) => {
      if (checkAndAddNewPage(lineHeight + 2)) {
        // Redraw headers on new page
        doc.setFont("helvetica", "bold");
        resultsColData.forEach((col, index) => {
          doc.text(safeString(col.title), margin + index * colWidth, yOffset);
        });
        yOffset += 7;
        doc.setFont("helvetica", "normal");
      }

      resultsColData.forEach((col, index) => {
        const value = safeString(row[col.field]);
        doc.text(value, margin + index * colWidth, yOffset);
      });
      yOffset += lineHeight;
    });
    yOffset += 20;

    // Second Table: Employee Vote List
    checkAndAddNewPage(50);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Employee Vote List", margin, yOffset);
    yOffset += 10;

    // Employee vote table headers
    const empColWidth = usableWidth / 2;

    doc.setFontSize(12);
    doc.text("Employee ID", margin, yOffset);
    doc.text("Employee Name", margin + empColWidth, yOffset);

    // Draw horizontal line under headers
    yOffset += 2;
    doc.line(margin, yOffset, pageWidth - margin, yOffset);
    yOffset += 5;
    // Draw employee vote table body
    doc.setFont("helvetica", "normal");
    empVoteList.forEach((user) => {
      if (checkAndAddNewPage(lineHeight + 2)) {
        // Redraw headers on new page
        doc.setFont("helvetica", "bold");
        doc.text("Employee ID", margin, yOffset);
        doc.text("Employee Name", margin + empColWidth, yOffset);
        yOffset += 7;
        doc.setFont("helvetica", "normal");
      }

      doc.text(safeString(user.user_id), margin, yOffset);
      doc.text(safeString(user.user_name), margin + empColWidth, yOffset);
      yOffset += lineHeight;
    });

    // Save the generated PDF
    doc.save("election-report.pdf");
  };

  return <Button onClick={generatePDF}>Download Report</Button>;
};

export default DownloadReportButton;
