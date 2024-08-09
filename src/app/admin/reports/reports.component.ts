import { Component, OnInit } from '@angular/core';
import { AdminService, Trip } from 'src/app/Services/admin.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  constructor(private AdminService: AdminService) {}

  Reports: any;
  ReportsFilter: string = '';
  startDate!: Date;
  endDate!: Date;
  startDateT!: Date;
  endDateT!: Date;
  tripSearch: string = '';
  trips: Trip[] = [];
  Highcharts: typeof Highcharts = Highcharts; // Define the type for Highcharts
  chartOptions1!: Highcharts.Options; // Options for the first chart
  chartOptions2!: Highcharts.Options; // Options for the second chart


  ngOnInit(): void {
    this.AdminService.getInitialReport().subscribe(data => this.Reports = data);
    this.AdminService.getTrips().subscribe(
      data => {
        this.trips = data;
        this.initializePieChart(); // Initialize the chart after trips data is available
      },
      error => {
        console.error('Error fetching trips:', error);
      }
    );
  }

  initializePieChart() {
    if (!this.trips || this.trips.length === 0) {
      console.error('No trips data available to generate the chart.');
      return;
    }
  
    // Aggregate trips by originstationid
    const stationDistribution = this.trips.reduce((acc: any, trip: Trip) => {
      const station = trip.originstation;
      if (station !== null) {
        if (acc[station]) {
          acc[station]++;
        } else {
          acc[station] = 1;
        }
      }
      return acc;
    }, {});
  
    // Convert aggregated data to Highcharts format
    const chartData = Object.keys(stationDistribution).map(station => ({
      name: `${station}`, // You can replace this with actual station names if available
      y: stationDistribution[station]
    }));
  
    // Calculate total number of trips
    const totalTrips = chartData.reduce((sum, data) => sum + data.y, 0);
  
    // Initialize the pie chart options
    this.chartOptions1 = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Trips by Origin Station'
      },
      subtitle: {
        text: `Total Trips: ${totalTrips}` // Display the total number of trips
      },
      tooltip: {
        pointFormat: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)'
      },
      series: [
        {
          name: 'Number of Trips',
          data: chartData
        } as any
      ]
    };
  }
  

  filterReports() {
    // Add filter logic here if needed
  }
}
