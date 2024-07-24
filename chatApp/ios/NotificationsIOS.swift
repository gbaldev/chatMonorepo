//
//  LocalPushPermissions.swift
//  chatApp
//
//  Created by Gonzalo Baldassarre on 21/07/2024.
//

import Foundation

@objc(NotificationsIOS)
class NotificationsIOS: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true;
  }
  
  @objc
  func requestPermissions(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let center = UNUserNotificationCenter.current()
    let options: UNAuthorizationOptions = [.alert, .sound, .badge]
    
    center.getNotificationSettings { settings in
      switch settings.authorizationStatus {
      case .notDetermined:
        center.requestAuthorization(options: options) { granted, error in
          if let error = error {
            reject("REQUEST_FAILED", error.localizedDescription, error)
          } else {
            resolve(granted)
          }
        }
      case .denied, .authorized:
        if let appSettings = URL(string: UIApplication.openSettingsURLString) {
          DispatchQueue.main.async {
            UIApplication.shared.open(appSettings, options: [:], completionHandler: nil)
          }
        }
        resolve(nil)
      default:
        break
      }
    }
  }
  
  @objc
  func checkPermissions(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    UNUserNotificationCenter.current().getNotificationSettings { settings in
      switch settings.authorizationStatus {
        case .authorized:
          resolve(true)
        case .denied, .notDetermined, .provisional, .ephemeral:
          resolve(false)
        @unknown default:
          resolve(false)
      }
    }
  }
  
  @objc
  func sendNotification(_ notification: NSDictionary) {
    guard let title = notification["title"] as? String,
          let body = notification["body"] as? String else {
      print("Invalid notification format")
      return
    }
      
    let content = UNMutableNotificationContent()
    content.title = title
    content.body = body
    let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: nil)
    
    UNUserNotificationCenter.current().add(request) { error in
      if let error = error {
        print("Error scheduling notification: \(error.localizedDescription)")
      } else {
        print("Notification scheduled")
      }
    }
  }
}
