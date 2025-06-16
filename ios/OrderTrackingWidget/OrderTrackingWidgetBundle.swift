//
//  OrderTrackingWidgetBundle.swift
//  OrderTrackingWidget
//
//  Created by Saif Siddiqui on 16/06/25.
//

import WidgetKit
import SwiftUI

@main
struct OrderTrackingWidgetBundle: WidgetBundle {
    var body: some Widget {
        OrderTrackingWidget()
        OrderTrackingWidgetControl()
        OrderTrackingWidgetLiveActivity()
    }
}
