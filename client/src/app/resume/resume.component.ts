import { Component, OnInit } from '@angular/core'
import { routerTransition } from '../router.transition'
import * as Highcharts from 'highcharts'
import { StorageService } from '../services/storage.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})

export class ResumeComponent implements OnInit {

  Highcharts = Highcharts
  chartConstructor = 'chart'
  chartOptions = {
    series: [{
      data: [1]
    }]
  }
  chartCallback = function (chart) { }
  updateFlag = false
  oneToOneFlag = true
  hasScores = false

  constructor(private roomService: RoomService) {

    Highcharts.setOptions({
      chart:{
        type: 'column'
      },
      title: {
        style: {
          color: '#666'
        },
        text: 'Pontuações'
      }
    })

    roomService.getScoresGraph().subscribe((scores: any[]) => {
      console.log(scores)
      if (scores && scores.length > 0) {
        console.log(scores)
        this.chartOptions = {
          series: [{
            data: scores.map(p => p.score)
          }]
        }
        this.hasScores = true
      }
    })
  }

  ngOnInit() {
  }
}
