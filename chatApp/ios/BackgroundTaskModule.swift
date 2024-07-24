//
//  BackgroundTaskModule.swift
//  chatApp
//
//  Created by Gonzalo Baldassarre on 22/07/2024.
//

import Foundation
import UserNotifications

@objc(BackgroundTaskModule)
class BackgroundTaskModule: NSObject {
    
    private var backgroundTask: UIBackgroundTaskIdentifier = .invalid
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
  
  //  This demonstrates how to create a background task to display notifications in background mode.
  //  This is not an accurate way of doing that since we have limited time to run our task
  //  before the OS terminates this activity. The proper way is implementing remote notifications (e.g., FCM)
  //  to handle these notifications.
  //  This approach aims to show the implementation of native modules with a simple local notification being fired
  //  when the socket emits the proper event, with all of this (permissions, notifications, and background tasks) being handled
  //  natively. Consider that push notifications will start failing when the OS decides to terminate the background task.
  
    @objc
    func startBackgroundTask(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            self.backgroundTask = UIApplication.shared.beginBackgroundTask { [weak self] in
                self?.endBackgroundTask()
            }
            
            if self.backgroundTask == .invalid {
                reject("ERROR_BACKGROUND_TASK", "Failed to start background task", nil)
            } else {
                resolve(true)
            }
        }
    }
    
    private func endBackgroundTask() {
        if backgroundTask != .invalid {
            UIApplication.shared.endBackgroundTask(backgroundTask)
            backgroundTask = .invalid
        }
    }
}
