#import "React/RCTBridgeModule.h"
#import "TRVSEventSource/TRVSEventSource.h"

@interface RNEventSource : NSObject <RCTBridgeModule, TRVSEventSourceDelegate> {
    TRVSEventSource *eventSource;
}

- (void)eventSourceDidOpen:(TRVSEventSource *)eventSource;
- (void)eventSource:(TRVSEventSource *)eventSource didReceiveEvent:(TRVSServerSentEvent *)event;
- (void)eventSource:(TRVSEventSource *)eventSource didFailWithError:(NSError *)error;

@property (nonatomic, retain) TRVSEventSource *eventSource;
@end
