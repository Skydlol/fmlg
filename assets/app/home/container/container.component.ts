import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"]
})
export class ContainerComponent implements OnInit {
  public innerWidth: any;

  constructor() {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
}
