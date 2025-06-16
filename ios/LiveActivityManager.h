//
//  LiveActivityManager.h
//  ZenzopApp
//
//  Created by Saif Siddiqui on 16/06/25.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LiveActivityManager, NSObject)

RCT_EXTERN_METHOD(startLiveActivity:(NSString *)orderId status:(NSString *)status elapsedTime:(NSInteger)elapsedTime)
RCT_EXTERN_METHOD(updateLiveActivity:(NSString *)status elapsedTime:(NSInteger)elapsedTime)
RCT_EXTERN_METHOD(endLiveActivity)

@end
