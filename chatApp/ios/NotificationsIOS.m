//
//  LocalPushPermissions.m
//  chatApp
//
//  Created by Gonzalo Baldassarre on 21/07/2024.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NotificationsIOS, NSObject)
RCT_EXTERN_METHOD(requestPermissions:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(checkPermissions:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(sendNotification:(NSDictionary *)notification)
@end
