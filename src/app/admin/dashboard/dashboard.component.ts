import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Chart,registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  result:any;
  barChartName:any;
  barChartValue:any;
  barChart:any;
  barChartOptions:any;
  isMenuCollapsed!: boolean;

  pieChartName:any=[];
  pieChartValue:any=[];
  users:any=[];

  chart:any=[];
  donutChartOptions:any

  constructor(
    private token:TokenStorageService,
    private route:Router,
    private dashboard:AuthService,
  ) {
    Chart.register(...registerables)
   }

  ngOnInit(): void {
    this.dashboard.dashboard().subscribe(
      data=>{
       this.result=data;

       this.barChartName = this.result.chartBar.map((item:any)=>
        item.name
       )
       this.barChartValue = this.result.chartBar.map((item:any) => item.value)

        this.pieChartName =this.result.chartDonut.map((item:any)=>item.name)
      

          this.pieChartValue =this.result.chartDonut.map((item:any)=>item.value)

         this.result.tableUsers.forEach((element:any) => {
           this.users.push(element);
          });
         //console.log(this.barChartValue)

         this.createChart('canvas2',this.barChartName,this.barChartValue,'bar');

         this.createChart('canvas',this.pieChartName,this.pieChartValue,'doughnut');
          

   
       
        
       
      }
    );
    

    
    //console.log(this.users)
  }

  createChart(chartName:any,labels:any,value:any,type:any){
    this.chart = new Chart(chartName,{
      type:type,
      data:{
          labels: labels,
        datasets: [{
          label: 'Score',
          data: value,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 88, 130, 0.2)',
            'rgba(75, 201, 25, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(75, 88, 130)',
            'rgb(75, 201, 25)'
  
          ],
          borderWidth: 1,
        }]
      },
      options:{
        responsive:true,
        // maintainAspectRatio:false
      }
    })

    // this.chart.data.labels=labels;
    // this.chart.update()

    //console.log(this.chart.)

  }


  signOut():void {
    this.token.signOut();
    this.route.navigate(['/']);
  

  }
  

}




