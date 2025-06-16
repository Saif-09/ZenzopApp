import ActivityKit
import WidgetKit
import SwiftUI

struct OrderTrackingWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: OrderTrackingWidgetAttributes.self) { context in
            // Lock Screen/Banner UI
            VStack {
                HStack {
                    Image(systemName: getIcon(for: context.state.status))
                        .foregroundColor(.white)
                    Spacer()
                    Text(formatTime(context.state.elapsedTime))
                        .foregroundColor(.white)
                        .font(.system(size: 16, weight: .bold))
                }
                Text("Order \(context.attributes.orderId) - \(context.state.status.capitalized)")
                    .foregroundColor(.white)
                    .font(.system(size: 14))
            }
            .padding()
            .activityBackgroundTint(Color.black.opacity(0.8))
            .activitySystemActionForegroundColor(Color.white)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded View
                DynamicIslandExpandedRegion(.leading) {
                    Image(systemName: getIcon(for: context.state.status))
                        .foregroundColor(.orange)
                        .font(.system(size: 24))
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text(formatTime(context.state.elapsedTime))
                        .foregroundColor(.black)
                        .font(.system(size: 18, weight: .bold))
                }
                DynamicIslandExpandedRegion(.center) {
                    Text("Order \(context.attributes.orderId)")
                        .foregroundColor(.black)
                        .font(.system(size: 16))
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text(context.state.status.capitalized)
                        .foregroundColor(.black)
                        .font(.system(size: 16, weight: .medium))
                }
            } compactLeading: {
                Image(systemName: getIcon(for: context.state.status))
                    .foregroundColor(.orange)
            } compactTrailing: {
                Text(formatTime(context.state.elapsedTime))
                    .foregroundColor(.black)
                    .font(.system(size: 14))
            } minimal: {
                Image(systemName: getIcon(for: context.state.status))
                    .foregroundColor(.orange)
            }
            .widgetURL(URL(string: "zenzopapp://order/\(context.attributes.orderId)"))
            .keylineTint(Color.orange)
        }
    }

    // Helper function to map status to an icon
    private func getIcon(for status: String) -> String {
        switch status {
        case "preparing":
            return "timer"
        case "on_the_way":
            return "car.fill"
        case "at_the_address":
            return "house.fill"
        case "delivered":
            return "checkmark.circle.fill"
        default:
            return "timer"
        }
    }

    // Helper function to format elapsed time
    private func formatTime(_ seconds: Int) -> String {
        let minutes = seconds / 60
        let remainingSeconds = seconds % 60
        return "\(minutes):\(remainingSeconds < 10 ? "0" : "")\(remainingSeconds)"
    }
}

// Preview setup remains the same
extension OrderTrackingWidgetAttributes {
    fileprivate static var preview: OrderTrackingWidgetAttributes {
        OrderTrackingWidgetAttributes(orderId: "12345")
    }
}

extension OrderTrackingWidgetAttributes.ContentState {
    fileprivate static var preparing: OrderTrackingWidgetAttributes.ContentState {
        OrderTrackingWidgetAttributes.ContentState(status: "preparing", elapsedTime: 600)
    }
    
    fileprivate static var onTheWay: OrderTrackingWidgetAttributes.ContentState {
        OrderTrackingWidgetAttributes.ContentState(status: "on_the_way", elapsedTime: 300)
    }
}

#Preview("Notification", as: .content, using: OrderTrackingWidgetAttributes.preview) {
    OrderTrackingWidgetLiveActivity()
} contentStates: {
    OrderTrackingWidgetAttributes.ContentState.preparing
    OrderTrackingWidgetAttributes.ContentState.onTheWay
}
