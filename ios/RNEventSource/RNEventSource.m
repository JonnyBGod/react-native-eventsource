#import "RNEventSource.h"

#import "RCTBridge.h"
#import "RCTConvert.h"
#import "RCTEventDispatcher.h"
#import "RCTUtils.h"

#import "EventSource.h"

@implementation EventSource (React)

- (NSNumber *)reactTag
{
  return objc_getAssociatedObject(self, _cmd);
}

- (void)setReactTag:(NSNumber *)reactTag
{
  objc_setAssociatedObject(self, @selector(reactTag), reactTag, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

@end

@implementation RNEventSource
{
    NSMutableDictionary<NSNumber *, EventSource *> *_sources;
}

@synthesize eventSource;
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (void)dealloc
{
  for (EventSource *source in _sources.allValues) {
    [source close];
  }
}

RCT_EXPORT_METHOD(connect:(NSString *)URLString sourceID:(nonnull NSNumber *)sourceID)
{ 
  NSURL *serverURL = [NSURL URLWithString:URLString];

  EventSource *source = [EventSource eventSourceWithURL:serverURL];
  source.reactTag = sourceID;

  [source onOpen: ^(Event *e) {
    [_bridge.eventDispatcher sendDeviceEventWithName:@"eventsourceOpen" body:@{
      @"id": source.reactTag
    }];
  }];

  [source onError: ^(Event *e) {
    [_bridge.eventDispatcher sendDeviceEventWithName:@"eventsourceFailed" body:@{
      @"message":e.error.userInfo[@"NSLocalizedDescription"],
      @"id": source.reactTag
    }];
    
    [source close];
  }];

  [source onMessage: ^(Event *e) {
    [_bridge.eventDispatcher sendDeviceEventWithName:@"eventsourceEvent" body:@{
      @"type": e.event ?: @"message",
      @"data": RCTNullIfNil(e.data),
      @"id": source.reactTag
    }];
  }];

  if (!_sources) {
    _sources = [NSMutableDictionary new];
  }

  _sources[sourceID] = source;
}

RCT_EXPORT_METHOD(close:(nonnull NSNumber *)sourceID)
{ 
  [_sources[sourceID] close];
  [_sources removeObjectForKey:sourceID];

  RCTLogInfo(@"RNEventSource: Closed %@", sourceID);
}

@end