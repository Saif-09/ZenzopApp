//
//  OrderTrackingAttributes.swift
//  OrderTrackingWidgetExtension
//
//  Created by Saif Siddiqui on 16/06/25.
//

import Foundation
import ActivityKit
import WidgetKit
import SwiftUI

struct OrderTrackingWidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic properties for the Live Activity
        var status: String // e.g., "preparing", "on_the_way", etc.
        var elapsedTime: Int // Time in seconds
    }

    // Static properties
    var orderId: String // A unique identifier for the order
}
