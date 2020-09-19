

import UIKit
import MobileCoreServices

@objc(ShareExtensionViewController)
class ShareViewController: UIViewController {

  override func viewDidLoad() {
    super.viewDidLoad()

 
  }
    @IBAction func closeImport(_ sender: UIButton) {
        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }
    @IBAction func importPdf(_ sender: UIButton) {
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
            let stringBase64Pdf = imageData.base64EncodedString(options: NSData.Base64EncodingOptions.init(rawValue: 0))
            //self.save(fileBase64: stringBase64Pdf, key: "imageData")
            self.uploadApi(fileBase64: stringBase64Pdf)
          } else {
            // Handle this situation as you prefer
            fatalError("Impossible to save image")
          }

        }}
      }
    }
      
    private func save(fileBase64: String, key: String) {

        let userDefaults = UserDefaults(suiteName:  "group.ch.netty.app")
        userDefaults?.addSuite(named: "group.ch.netty.app")
        userDefaults?.set(fileBase64, forKey: key)
        userDefaults?.synchronize()
    }
    
 
    private func uploadApi(fileBase64: String) {
        let urlString = URL(string: "https://netty-app.herokuapp.com/classifier/analyse-pdf")!
        var request = URLRequest(url: urlString)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.httpMethod = "POST"
        
        let json = [
            "data": fileBase64,
        ]
        
        if let jsonData = try? JSONSerialization.data(withJSONObject: json, options: .withoutEscapingSlashes) {
            URLSession.shared.uploadTask(with: request, from: jsonData) {
                data, response, error in
                if let httpResponse = response as? HTTPURLResponse {
                    self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)

                }
            }.resume()
        }
        
    }
}
