import { Component, OnInit } from '@angular/core'
import { fadeInTransition } from '../router.transition'
import * as Highcharts from 'highcharts'
import { StorageService } from '../services/storage.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  animations: [fadeInTransition],
  host: { '[@fadeInTransition]': '' }
})

export class ResumeComponent implements OnInit {

  Highcharts = Highcharts
  chartConstructor = 'chart'
  chartOptions: any = {
    series: [{
      data: [1]
    }]
  }
  chartCallback = function (chart) { }
  updateFlag = false
  oneToOneFlag = true
  hasScores = false
  loading = false

  constructor(private roomService: RoomService) {

    Highcharts.setOptions({
      chart: {
        type: 'column'
      }
    })

    this.loading = true

    roomService.getScoresGraph().subscribe((res: any[]) => {
      this.loading = false

      if (res && res.length > 0) {

        const total = res.map(p => p.score).reduce((x, y) => x + y)
        Highcharts.setOptions({
          chart: {
            type: 'column'
          },
          title: {
            style: {
              color: '#666'
            },
            text: `Participações: ${res.length}`
          },
          subtitle: {
            text: `Total de pontos já realizados: ${total}`
          }
        })

        this.chartOptions = {
          yAxis: {
            title: {
              text: 'Pontos'
            }
          },
          xAxis: {
            title: {
              text: 'Salas'
            }
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },

          plotOptions: {
            series: {
              dashStyle: 'ShortDash',
              label: {
                connectorAllowed: false
              },
              pointStart: 1
            },
            column: {
              maxPointWidth: 30
            }
          },
          series: [{
            color: '#4a4',
            data: res.map(p => p.points),
            name: 'Pontos possíveis.'
          }, {
            data: res.map(p => p.score),
            name: 'Pontos realizados.'
          }]
        }
        this.hasScores = true
      }
    }, err => this.loading = false)
  }

  ngOnInit() {
  }
}
