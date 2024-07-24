//
//  BackgroundTaskModule.swift
//  chatApp
//
//  Created by Gonzalo Baldassarre on 22/07/2024.
//


#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BackgroundTaskModule, NSObject)

RCT_EXTERN_METHOD(startBackgroundTask:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(scheduleLocalNotification:(NSDictionary *)notification)

@end
