//
//  LiveActivityManager.swift
//  ZenzopApp
//
//  Created by Saif Siddiqui on 16/06/25.
//

import Foundation
import ActivityKit
import UIKit

@available(iOS 16.1, *)
@objc(LiveActivityManager)
class LiveActivityManager: NSObject {
    static var shared = LiveActivityManager()
    private var currentActivity: Activity<OrderTrackingWidgetAttributes>?

    @objc
    func startLiveActivity(orderId: String, status: String, elapsedTime: Int) {
        // Ensure Live Activities are available (iOS 16.1+)
        guard ActivityAuthorizationInfo().areActivitiesEnabled else {
            print("Live Activities are not supported on this device.")
            return
        }

        // End any existing activity
        endLiveActivity()

        // Define the attributes and initial state
        let attributes = OrderTrackingWidgetAttributes(orderId: orderId)
        let contentState = OrderTrackingWidgetAttributes.ContentState(status: status, elapsedTime: elapsedTime)

        do {
            // Start the Live Activity
            currentActivity = try Activity<OrderTrackingWidgetAttributes>.request(
                attributes: attributes,
                contentState: contentState,
                pushType: nil
            )
            print("Live Activity started: \(orderId)")
        } catch {
            print("Error starting Live Activity: \(error.localizedDescription)")
        }

        // Save to UserDefaults for the widget to access
        if let sharedDefaults = UserDefaults(suiteName: "group.com.yourapp.zenzop") {
            sharedDefaults.set(orderId, forKey: "orderId")
            sharedDefaults.set(status, forKey: "status")
            sharedDefaults.set(elapsedTime, forKey: "elapsedTime")
            sharedDefaults.synchronize()
        }
    }

    @objc
    func updateLiveActivity(status: String, elapsedTime: Int) {
        guard let activity = currentActivity else {
            print("No active Live Activity to update.")
            return
        }

        Task {
            let updatedState = OrderTrackingWidgetAttributes.ContentState(status: status, elapsedTime: elapsedTime)
            await activity.update(using: updatedState)
            print("Live Activity updated: \(status), \(elapsedTime)")

            // Update UserDefaults
            if let sharedDefaults = UserDefaults(suiteName: "group.com.yourapp.zenzop") {
                sharedDefaults.set(status, forKey: "status")
                sharedDefaults.set(elapsedTime, forKey: "elapsedTime")
                sharedDefaults.synchronize()
            }
        }
    }

    @objc
    func endLiveActivity() {
        guard let activity = currentActivity else {
            return
        }

        Task {
            await activity.end(dismissalPolicy: .immediate)
            currentActivity = nil
            print("Live Activity ended.")

            // Clear UserDefaults
            if let sharedDefaults = UserDefaults(suiteName: "group.com.yourapp.zenzop") {
                sharedDefaults.removeObject(forKey: "orderId")
                sharedDefaults.removeObject(forKey: "status")
                sharedDefaults.removeObject(forKey: "elapsedTime")
                sharedDefaults.synchronize()
            }
        }
    }

    // Expose to React Native
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
