export const BusesDetails = [
    {
      id: 1,
      name: "Chennai Express",
      source: "Chennai",
      destination: "Mumbai",
      departureTime: "06:00 AM",
      arrivalTime: "12:30 PM",
      price: "₹600",

      busType: "Sleeper",
      numberOfSeats: 36,
      seatLayout: {
        lower: {
          first: [
            [1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12],
          ],
          second: [13, 14, 15, 16, 17, 18],
        },
        upper: {
          first: [
            [19, 20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29, 30],
          ],
          second: [31, 32, 33, 34, 35, 36],
        },
      },
      availableSeats: ["U19", "U24", "U30", "L4", "L16", "L6"],
    },
    {
      id: 2,
      name: "Coimbatore Comfort",
      source: "Coimbatore",
      destination: "Chennai",
      departureTime: "07:30 AM",
      arrivalTime: "02:00 PM",
      price: "₹550",
    
      busType: "Seater",
      numberOfSeats: 60,
      seatLayout: {
        first: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
        ],
        second: [
          [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
          [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        ],
      },
      availableSeats: [
        "1",
        "2",
        "3",
        "5",
        "7",
        "13",
        "15",
        "30",
        "35",
        "60",
        "59",
      ],
    },
    {
      id: 3,
      name: "NueGo Travels",
      source: "Bangalore",
      destination: "Coimbatore",
      departureTime: "09:15 AM",
      arrivalTime: "03:45 PM",
      price: "₹700",
   
      busType: "Sleeper",
      numberOfSeats: 36,
      seatLayout: {
        lower: {
          first: [
            [1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12],
          ],
          second: [13, 14, 15, 16, 17, 18],
        },
        upper: {
          first: [
            [19, 20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29, 30],
          ],
          second: [31, 32, 33, 34, 35, 36],
        },
      },
      availableSeats: ["U19", "U24", "U30", "L4", "L16", "L6"],
    },
    {
      id: 4,
      name: "Mumbai Magic",
      source: "Mumbai",
      destination: "Bangalore",
      departureTime: "11:00 AM",
      arrivalTime: "05:30 PM",
      price: "₹650",
  
      busType: "Seater",
      numberOfSeats: 48,
      seatLayout: {
        first: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        ],
        second: [
          [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
          [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
        ],
      },
      availableSeats: ["2", "5", "6", "1", "3", "7", "4"],
    },
    {
      id: 5,
      name: "Delhi Speedster",
      source: "Delhi",
      destination: "Chennai",
      departureTime: "08:45 AM",
      arrivalTime: "03:15 PM",
      price: "₹580",
      
      busType: "Sleeper",
      numberOfSeats: 36,
      seatLayout: {
        lower: {
          first: [
            [1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12],
          ],
          second: [13, 14, 15, 16, 17, 18],
        },
        upper: {
          first: [
            [19, 20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29, 30],
          ],
          second: [31, 32, 33, 34, 35, 36],
        },
      },
      availableSeats: ["U19", "U24", "U30", "L4", "L16", "L6"],
    },
    {
      id: 31,
      name: "Chennai Express",
      source: "Chennai",
      destination: "Mumbai",
      departureTime: "08:00 AM",
      arrivalTime: "02:30 PM",
      price: "₹600",
 
      busType: "Sleeper",
      numberOfSeats: 36,
      seatLayout: {
        lower: {
          first: [
            [1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12],
          ],
          second: [13, 14, 15, 16, 17, 18],
        },
        upper: {
          first: [
            [19, 20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29, 30],
          ],
          second: [31, 32, 33, 34, 35, 36],
        },
      },
      availableSeats: ["U19", "U24", "U30", "L4", "L16", "L6"],
    },
    {
      id: 32,
      name: "Coimbatore Comfort",
      source: "Coimbatore",
      destination: "Chennai",
      departureTime: "09:30 AM",
      arrivalTime: "04:00 PM",
      price: "₹550",
 
      busType: "Seater",
      numberOfSeats: 48,
      seatLayout: {
        first: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        ],
        second: [
          [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
          [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
        ],
      },
      availableSeats: ["2", "5", "6", "1", "3", "7", "4"],
    },
    {
      id: 33,
      name: "NueGo Travels",
      source: "Bangalore",
      destination: "Coimbatore",
      departureTime: "11:15 AM",
      arrivalTime: "05:45 PM",
      price: "₹700",

      busType: "Sleeper",
      numberOfSeats: 36,
      seatLayout: {
        lower: {
          first: [
            [1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12],
          ],
          second: [13, 14, 15, 16, 17, 18],
        },
        upper: {
          first: [
            [19, 20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29, 30],
          ],
          second: [31, 32, 33, 34, 35, 36],
        },
      },
      availableSeats: ["U19", "U24", "U30", "L4", "L16", "L6"],
    },
    {
      id: 34,
      name: "Mumbai Magic",
      source: "Mumbai",
      destination: "Bangalore",
      departureTime: "01:00 PM",
      arrivalTime: "07:30 PM",
      price: "₹2000",
   
      busType: "Seater",
      numberOfSeats: 48,
      seatLayout: {
        first: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        ],
        second: [
          [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
          [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
        ],
      },
      availableSeats: ["2", "5", "6", "1", "3", "7", "4"],
    },
    {
      id: 35,
      name: "Delhi Speedster",
      source: "Delhi",
      destination: "Chennai",
      departureTime: "08:45 AM",
      arrivalTime: "03:15 PM",
      price: "₹5000",
 
      busType: "Sleeper",
      numberOfSeats: 36,
      seatLayout: {
        lower: {
          first: [
            [1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12],
          ],
          second: [13, 14, 15, 16, 17, 18],
        },
        upper: {
          first: [
            [19, 20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29, 30],
          ],
          second: [31, 32, 33, 34, 35, 36],
        },
      },
      availableSeats: ["U19", "U24", "U30", "L4", "L16", "L6"],
    },
    {
      id: 41,
      name: "Chennai Express",
      source: "Chennai",
      destination: "Mumbai",
      departureTime: "08:30 AM",
      arrivalTime: "03:00 PM",
      price: "₹4000",
    
      busType: "Sleeper",
      numberOfSeats: 36,
      seatLayout: {
        lower: {
          first: [
            [1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12],
          ],
          second: [13, 14, 15, 16, 17, 18],
        },
        upper: {
          first: [
            [19, 20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29, 30],
          ],
          second: [31, 32, 33, 34, 35, 36],
        },
      },
      availableSeats: ["U19", "U24", "U30", "L4", "L16", "L6"],
    },
    {
      id: 42,
      name: "Coimbatore Comfort",
      source: "Coimbatore",
      destination: "Chennai",
      departureTime: "10:00 AM",
      arrivalTime: "04:30 PM",
      price: "₹550",
      
      busType: "Seater",
      numberOfSeats: 60,
      seatLayout: {
        first: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
        ],
        second: [
          [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
          [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        ],
      },
      availableSeats: [
        "1",
        "2",
        "3",
        "5",
        "7",
        "13",
        "15",
        "30",
        "35",
        "60",
        "59",
      ],
    },
    {
      id: 43,
      name: "NueGo Travels",
      source: "Bangalore",
      destination: "Coimbatore",
      departureTime: "12:15 PM",
      arrivalTime: "05:45 PM",
      price: "₹700",
      
      busType: "Seater",
      numberOfSeats: 60,
      seatLayout: {
        first: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
        ],
        second: [
          [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
          [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        ],
      },
      availableSeats: [
        "1",
        "2",
        "3",
        "5",
        "7",
        "13",
        "15",
        "30",
        "35",
        "60",
        "59",
      ],
    },
    {
      id: 44,
      name: "Mumbai Magic",
      source: "Mumbai",
      destination: "Bangalore",
      departureTime: "02:00 PM",
      arrivalTime: "07:30 PM",
      price: "₹1500",
      
      busType: "Seater",
      numberOfSeats: 60,
      seatLayout: {
        first: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
        ],
        second: [
          [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
          [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        ],
      },
      availableSeats: [
        "1",
        "2",
        "3",
        "5",
        "7",
        "13",
        "15",
        "30",
        "35",
        "60",
        "59",
      ],
    },
    {
      id: 45,
      name: "Delhi Speedster",
      source: "Delhi",
      destination: "Chennai",
      departureTime: "09:15 AM",
      arrivalTime: "03:45 PM",
      price: "₹580",

      busType: "Seater",
      numberOfSeats: 48,
      seatLayout: {
        first: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        ],
        second: [
          [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
          [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
        ],
      },
      availableSeats: ["2", "5", "6", "1", "3", "7", "4"],
    },
  ];
  export const locations = [
    "Chennai",
    "Coimbatore",
    "Bangalore",
    "Mumbai",
    "Delhi",
  ];