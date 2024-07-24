#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <UserNotifications/UserNotifications.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"chatApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// handling notifications from foreground
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
    completionHandler(UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionSound);
}

- (void)application:(UIApplication *)application handleEventsForBackgroundURLSession:(NSString *)identifier completionHandler:(void (^)(void))completionHandler
{
  // Handle background events, potentially reconnecting the socket
  // You might want to send an event to your JS code here
  [[NSNotificationCenter defaultCenter] postNotificationName:@"HandleBackgroundSession" object:nil];
  completionHandler();
}

- (void)application:(UIApplication *)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  // Perform background fetch
  // You can use this to keep your socket connection alive or fetch new data
  [[NSNotificationCenter defaultCenter] postNotificationName:@"PerformBackgroundFetch" object:nil];
  completionHandler(UIBackgroundFetchResultNewData);
}

@end
