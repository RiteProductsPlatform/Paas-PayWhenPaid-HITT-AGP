define([], () => {
  'use strict';

  class PageModule {

    // date format
    formatDate(dateStr) {
      const date = new Date(dateStr);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);

      return `${day}-${month}-${year}`;
    }

    exportLOGS_PWP(data) {
      if (data && data.length > 0) {

        let headerFields = [
          "SequenceID",
          "SessionID",
          "API Name",
          "Page Name",
          "Debug Message",
          "Error Code",
          "Error Details",
          "Procedure Name",
          "UserID"
        ];

        // Convert data to CSV rows
        let rows = data.map((itm) => [
          itm["sequence_id"],
          itm["session_id"],
          itm["api_name"],
          itm["page_name"],
          itm["debug_message"],
          itm["error_code"],
          itm["error_details"],
          itm["procedure_name"],
          itm["user_id"]
        ]);

        // Combine header + rows
        let csvContent = [headerFields, ...rows]
          .map(row => row.map(val => `"${val ?? ''}"`).join(","))
          .join("\n");

        // Create Blob
        let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

        // Create download link
        let link = document.createElement("a");
        let url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", "LogsData.csv");
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);

        return true;
      }
    }
  }

  return PageModule;
});