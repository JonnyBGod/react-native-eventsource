#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif
#import "EventSource.h"

@interface RNEventSource : NSObject <RCTBridgeModule> {
    EventSource *eventSource;
}

@property (nonatomic, retain) EventSource *eventSource;
@end