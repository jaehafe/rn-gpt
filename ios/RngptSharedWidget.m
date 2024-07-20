//
//  RngptSharedWidget.m
//  Rngpt
//
//  Created by LEE JAEHA on 7/20/24.
//

#import <Foundation/Foundation.h>
#import "RngptSharedWidget.h"
#import "Rngpt-Swift.h"

@implementation RngptSharedWidget

-(dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(RngptSharedWidget);

RCT_EXPORT_METHOD(set:(NSString *)data
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
//{
//  @try{
//    NSUserDefaults *shared = [[NSUserDefaults alloc]initWithSuiteName:@"group.rngptwidget"]; //App Group명
//    [shared setObject:data forKey:@"rngptWidgetData"]; // data를 저장할 key 값
//    [shared synchronize];
//    resolve(@"true");
//  }@catch(NSException *exception){
//    reject(@"get_error",exception.reason, nil);
//  }

{
  @try {
    NSLog(@"Attempting to save data: %@", data);
    NSData *jsonData = [data dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *jsonDict = [NSJSONSerialization JSONObjectWithData:jsonData options:0 error:nil];
    NSString *widgetData = jsonDict[@"rngptWidgetData"];
    
    NSUserDefaults *shared = [[NSUserDefaults alloc] initWithSuiteName:@"group.rngptwidget"];
    [shared setObject:widgetData forKey:@"rngptWidgetData"];
    [shared synchronize];
    NSLog(@"Data saved successfully");
    
    if (@available(iOS 14, *)) {
      [WidgetKitHelper reloadAllTimelines];
    }
  } @catch (NSException *exception) {
    NSLog(@"Error saving data: %@", exception.reason);
    reject(@"set_error", exception.reason, nil);
  }

}

@end
