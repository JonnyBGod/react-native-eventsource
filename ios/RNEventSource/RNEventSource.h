#import "RCTBridgeModule.h"
#import "EventSource.h"

@interface RNEventSource : NSObject <RCTBridgeModule> {
    EventSource *eventSource;
}

@property (nonatomic, retain) EventSource *eventSource;
@end