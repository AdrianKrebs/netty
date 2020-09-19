import {Component, OnInit} from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private appPreferences: AppPreferences) { }

  ngOnInit() {
    console.log('Trying to fetch')
    this.findPdfInPrefs();
  }

  async findPdfInPrefs() {
    let suitsPref = this.appPreferences.suite('group.ch.netty.app');
    let pdf = await suitsPref.fetch('imageData');

  }

}


/**
 *

 import UIKit
 import MobileCoreServices

 @objc(ShareExtensionViewController)
 class ShareViewController: UIViewController {

  override func viewDidLoad() {
    super.viewDidLoad()

    self.handleSharedFile()


  }

    private func handleSharedFile() {
      // extracting the path to the URL that is being shared

        self.save(key: "imageData")

    }

    private func save(key: String) {
      let userDefaults = UserDefaults(suiteName:  "group.ch.netty.app")
        userDefaults?.addSuite(named: "group.ch.netty.app")
        userDefaults?.set("Cloude", forKey: key)
        userDefaults?.synchronize()

        print("Tried to persist");
    }
}

 */
