import ActivityKit
import WidgetKit
import SwiftUI

struct LiveActivityAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var emoji: String
    }

    var name: String
}

struct LiveActivityLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: LiveActivityAttributes.self) { context in
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Image(systemName: "takeoutbag.and.cup.and.straw.fill")
                        .foregroundColor(.orange)
                        .font(.system(size: 16))
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("$19.90")
                        .foregroundColor(.white)
                        .font(.headline)
                }
                DynamicIslandExpandedRegion(.center) {
                    Text("BurgerHouse")
                        .foregroundColor(.gray)
                        .font(.caption)
                    Text("Cheeseburger Menu x2")
                        .foregroundColor(.white)
                        .font(.headline)
                }
                DynamicIslandExpandedRegion(.bottom) {
                    HStack {
                        Image(systemName: "person.circle.fill")
                            .foregroundColor(.gray)
                            .font(.system(size: 24))
                        VStack(alignment: .leading) {
                            Text("Kadir's ETA")
                                .foregroundColor(.white)
                                .font(.caption)
                            Text("8 min \(context.state.emoji)")
                                .foregroundColor(.cyan)
                                .font(.headline)
                        }
                        Spacer()
                        Image(systemName: "message.fill")
                            .foregroundColor(.cyan)
                            .font(.system(size: 20))
                            .padding(.horizontal, 4)
                        Image(systemName: "phone.fill")
                            .foregroundColor(.cyan)
                            .font(.system(size: 20))
                    }
                    .padding(.horizontal, 8) // Added horizontal padding
                    Text("©BurgerHouse Inc.")
                        .foregroundColor(.gray)
                        .font(.caption2)
                        .padding(.top, 4)
                }
            } compactLeading: {
                Image(systemName: "takeoutbag.and.cup.and.straw.fill")
                    .foregroundColor(.orange)
                    .font(.system(size: 16))
            } compactTrailing: {
                Text("8 min")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension LiveActivityAttributes {
    fileprivate static var preview: LiveActivityAttributes {
        LiveActivityAttributes(name: "World")
    }
}

extension LiveActivityAttributes.ContentState {
    fileprivate static var smiley: LiveActivityAttributes.ContentState {
        LiveActivityAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: LiveActivityAttributes.ContentState {
         LiveActivityAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: LiveActivityAttributes.preview) {
   LiveActivityLiveActivity()
} contentStates: {
    LiveActivityAttributes.ContentState.smiley
    LiveActivityAttributes.ContentState.starEyes
}
