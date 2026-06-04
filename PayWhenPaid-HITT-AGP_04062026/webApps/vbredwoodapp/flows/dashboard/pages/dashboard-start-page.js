define([], () => {
  'use strict';

  class PageModule {
  }
  PageModule.prototype.getData = function(){
const subcontractors = [
  {
    name: "Apex Electrical",
    amountHeld: "$285,000",
    daysWaiting: "22",
    status: "On Hold"
  },
  {
    name: "Valley Plumbing",
    amountHeld: "$192,000",
    daysWaiting: "4",
    status: "Ready to Pay"
  },
  {
    name: "SteelFab Inc",
    amountHeld: "$178,000",
    daysWaiting: "78",
    status: "Dispute"
  },
  {
    name: "MechSys Corp",
    amountHeld: "$156,000",
    daysWaiting: "15",
    status: "On Hold"
  },
  {
    name: "Concrete Pro",
    amountHeld: "$134,000",
    daysWaiting: "8",
    status: "Ready to Pay"
  },
  {
    name: "HVAC Solutions",
    amountHeld: "$98,000",
    daysWaiting: "31",
    status: "On Hold"
  }
];
return subcontractors;

  };
  PageModule.prototype.getData1 = function(){
const projects = [
  {
    projectName: "City Tower A",
    ownerPaid: "$18,200,000",
    subApproved: "$14,800,000",
    releasedToSubs: "$13,900,000",
    stillHeld: "$900,000",
    percentReleased: 94
  },
  {
    projectName: "County Hospital",
    ownerPaid: "$9,700,000",
    subApproved: "$8,100,000",
    releasedToSubs: "$6,200,000",
    stillHeld: "$1,900,000",
    percentReleased: 76
  },
  {
    projectName: "Highway 95 Bridge",
    ownerPaid: "$5,100,000",
    subApproved: "$4,600,000",
    releasedToSubs: "$2,800,000",
    stillHeld: "$1,800,000",
    percentReleased: 61
  },
  {
    projectName: "Shopping Plaza",
    ownerPaid: "$3,400,000",
    subApproved: "$2,900,000",
    releasedToSubs: "$2,700,000",
    stillHeld: "$200,000",
    percentReleased: 93
  }
];
return projects;


    
  };
  PageModule.prototype.getData2 = function(){
const payments = [
  {
    expectedOwnerPayment: "Dec 5, 2025",
    ownerAmount: "$1,200,000",
    subRelease: "$980,000",
    keySubs: "Apex, Valley"
  },
  {
    expectedOwnerPayment: "Dec 18, 2025",
    ownerAmount: "$750,000",
    subRelease: "$620,000",
    keySubs: "SteelFab"
  },
  {
    expectedOwnerPayment: "Dec 30, 2025",
    ownerAmount: "$1,100,000",
    subRelease: "$920,000",
    keySubs: "Multiple"
  }
];
return payments;


    
  };
  PageModule.prototype.getColour= function(data){
    if(data>30){
      return 'red';
    }
    else{
      return 'green';
    }
  };

    PageModule.prototype.getColour1= function(data){
    if(data ==='On Hold' || data ==="Dispute"){
      return 'red1';
    }
    else{
      return 'green1';
    }
  };

  PageModule.prototype.getColour2= function(data){
    if(data>80){
      return 'green';
    }
    else{
      return 'red';
    }
  };

  PageModule.prototype.getChartData= function(){
    let chartData=[  
    {
      "id": 0,
      "series": "Owner Paid GC",
      "group": "Jul 2024",
      "value": 1300000
    },
    {
      "id": 1,
      "series": "Owner Paid GC",
      "group": "Aug 2024",
      "value": 1800000
    },
     {
      "id": 2,
      "series": "Owner Paid GC",
      "group": "Sep 2024",
      "value": 1400000
    },
     {
      "id": 3,
      "series": "Owner Paid GC",
      "group": "Oct 2024",
      "value": 3000000
    },
     {
      "id": 4,
      "series": "Owner Paid GC",
      "group": "Nov 2024",
      "value": 4000000
    },
     {
      "id": 5,
      "series": "Owner Paid GC",
      "group": "Dec 2024",
      "value": 2800000
    },
    {
      "id": 6,
      "series": "GC Paid Subs",
      "group": "Jul 2024",
      "value": 1400000
    },
    {
      "id": 7,
      "series": "GC Paid Subs",
      "group": "Aug 2024",
      "value": 1400000
    },
     {
      "id": 8,
      "series": "GC Paid Subs",
      "group": "Sep 2024",
      "value": 1600000
    },
 {
      "id": 9,
      "series": "GC Paid Subs",
      "group": "Oct 2024",
      "value": 2800000
    },
 {
      "id": 10,
      "series": "GC Paid Subs",
      "group": "Nov 2024",
      "value": 2500000
    },
 {
      "id": 7,
      "series": "GC Paid Subs",
      "group": "Dec 2024",
      "value": 2300000
    }
   
  ];
  return chartData;
  };
  PageModule.prototype.getChartData1= function(){
    let chartdata= [
     {
      "id": 0,
      "series": "Owner Paid GC",
      "group": "0-15 Days",
      "value": 12000
    },
    {
      "id": 1,
      "series": "Owner Paid GC",
      "group": "16-30 Days",
      "value": 60000
    },
     {
      "id": 2,
      "series": "Owner Paid GC",
      "group": "31-60 Days",
      "value": 33000
    },
     {
      "id": 3,
      "series": "Owner Paid GC",
      "group": "61+ Days",
      "value": 13000
    }
  ];
  return chartdata;
  };
  
  return PageModule;
});
