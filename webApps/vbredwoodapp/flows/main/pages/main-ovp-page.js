define([], () => {
  'use strict';

  class PageModule {

    handleSwitchChange(event, context) {
      const newValue = event.detail.value ? 1 : 0; // Map true/false to 1/0
      const rowData = context.cell.row; // Access the current row data


      rowData.enabled_flag = newValue;

      console.log(`Switch toggled: Project ID ${rowData.project_id}, New Value: ${newValue}`);
    }


 countDuplicatesByName(arr) {
  const counts = arr.reduce((acc, item) => {
    const key = item.NAME;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.fromEntries(
    Object.entries(counts).filter(([_, count]) => count > 1)
  );
}

    formatDate(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    getCurrentDate() {
      const today = new Date();
      const yyyy = today.getFullYear();                          // full year (e.g., 2025)
      const mm = String(today.getMonth() + 1).padStart(2, '0');  // month (01–12)
      const dd = String(today.getDate()).padStart(2, '0');       // day (01–31)
      return `${yyyy}-${mm}-${dd}`;
    }


    splitRecordsByTaskId(records) {
      const sameRecords = [];
      const differentRecords = [];

      records.forEach(record => {
        if (record.TaskId === record.TopTaskId) {
          sameRecords.push(record);
        } else {
          differentRecords.push(record);
        }
      });

      return { sameRecords, differentRecords };
    }

    getCanonicalHashCode(response) {
      try {
        // Get the links array from the first item
        const links = response?.body?.items?.[0]?.links;

        if (!Array.isArray(links)) {
          throw new Error("Links not found in response.body.items[0]");
        }

        // Find the canonical link
        const canonicalLink = links.find(link => link.rel === "canonical");

        if (!canonicalLink?.href) {
          throw new Error("Canonical link not found or invalid");
        }

        // Split href by '/' and get the last part
        const parts = canonicalLink.href.split("/");
        const lastHash = parts[parts.length - 1];

        return lastHash;
      } catch (error) {
        console.error("Error extracting canonical hash:", error.message);
        return null;
      }
    }

    removeDuplicates(records, key) {
      const seen = new Set();
      const uniqueRecords = [];

      for (const record of records) {
        const value = record[key];
        if (!seen.has(value)) {
          seen.add(value);
          uniqueRecords.push(record);
        }
      }

      return uniqueRecords;
    }

    filterRecordsByLike(records, searchString) {
      if (!Array.isArray(records) || !searchString) return [];

      const lowerSearch = searchString.toLowerCase();

      return records.filter(record => {
        return Object.values(record).some(value =>
          typeof value === "string" && value.toLowerCase().includes(lowerSearch)
        );
      });




    }

  }

  return PageModule;
});
