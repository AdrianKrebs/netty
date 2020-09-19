

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
      let attachments = (self.extensionContext?.inputItems.first as? NSExtensionItem)?.attachments ?? []
      let contentType = kUTTypeData as String
      for provider in attachments {
        // Check if the content type is the same as we expected
        if provider.hasItemConformingToTypeIdentifier(contentType) {
          provider.loadItem(forTypeIdentifier: contentType,
                            options: nil) { [unowned self] (data, error) in
          // Handle the error here if you want
          guard error == nil else { return }
               
          if let url = data as? URL,
             let imageData = try? Data(contentsOf: url) {
               self.save(imageData, key: "imageData", value: imageData)
          } else {
            // Handle this situation as you prefer
            fatalError("Impossible to save image")
          }
            self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)

        }}
      }
    }
      
    private func save(_ data: Data, key: String, value: Any) {
        let fileStream:String = data.base64EncodedString(options: NSData.Base64EncodingOptions.init(rawValue: 0))

        let userDefaults = UserDefaults(suiteName:  "group.ch.netty.app")
        userDefaults?.addSuite(named: "group.ch.netty.app")
        userDefaults?.set(fileStream, forKey: key)
        userDefaults?.synchronize()
    }
}
