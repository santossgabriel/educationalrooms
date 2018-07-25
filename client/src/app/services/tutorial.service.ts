import { Injectable } from "@angular/core";
import { TourStep } from "../helpers/tour";

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  set(step: TourStep) {
    localStorage.setItem('TUTORIAL', JSON.stringify(step))
  }

  get(): TourStep {
    return <TourStep>JSON.parse(localStorage.getItem('TUTORIAL'))
  }
}
