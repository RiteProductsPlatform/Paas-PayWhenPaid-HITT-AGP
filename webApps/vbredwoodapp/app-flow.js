/* Copyright (c) 2024, Oracle and/or its affiliates */

define(['oj-sp/spectra-shell/config/config'], function () {
  'use strict';

  class AppModule {

    validateGroup(id) {
      var tracker = document.getElementById(id);
      if (tracker.valid === "valid") {
      }
      else if (tracker.valid.startsWith("invalid")) {
        if (tracker.valid === "invalidHidden") {
          tracker.showMessages();
        }
        tracker.focusOn("@firstInvalidShown");
      }
      return tracker.valid;
    }
    // the below function is used to format the date from DD-MM-YYYY → DD-MON-YYYY 
    formatTo_DD_MON_YYYY(dateInput) {
      if (!dateInput) return "";

      // Convert input to a valid Date object
      const date = new Date(dateInput);

      // If the date is invalid, return empty or handle error
      if (isNaN(date)) return "";

      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();

      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

      const mon = months[date.getMonth()];

      return `${day}-${mon}-${year}`;
    }

    // the below function is used to format the date from 18-11-2025 → 18-NOV-2025 
    formatTo_DD_MON_YYYY_apInvDate(dateInput) {
      if (!dateInput) return "";

      // Expecting dateInput in format: DD-MM-YYYY
      const parts = dateInput.split("-");
      if (parts.length !== 3) return "";

      const [day, month, year] = parts;

      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

      const mon = months[parseInt(month, 10) - 1]; // convert 11 → NOV

      return `${day}-${mon}-${year}`;
    }

    // role based authentication Code starts


    getUsernameFromJwt(token) {
      try {
        if (token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c =>
              '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join('')
          );
          const payload = JSON.parse(jsonPayload);
          return payload.sub || null;

        }

      } catch (e) {
        console.error("Invalid JWT token", e);
        return null;
      }
    }
    getMenuItems(menuList, accessFlagArray) {

     

      if (!Array.isArray(accessFlagArray) || accessFlagArray.length === 0) {
        return [];
      }
     
      // Extract all access_flag values → ["U"] or ["M", "U"]
      const flags = accessFlagArray.map(item => item.access_flag);


    // If flags contain ONLY "N" → return no menu
      if (flags.every(flag => flag === "N")) {
        return [];
      }

      // 1. If access contains 'M' → full access
      if (flags.includes("M")) {
        return [...menuList];
      }

      // 2. If access contains 'U' → workbench + analytics
      if (flags.includes("U")) {
        return menuList.filter(item =>
          //  item.id === "shell/landing_dashboard/landing_dashboard-start" ||
          item.id === "shell/collaboration/unmatched_invoices" ||
          item.id === "shell/collaboration" ||
          item.id === "shell/collaboration/discrepancy" ||
          item.id === "shell/analytics/analytics-start"  ||
          item.id === "shell/logscreen/logscreen-start"
        
        );
      }

      // 3. If unknown access → no pages
      return [];
    }



    // role based authentication Code ends

  }

  return AppModule;
});
