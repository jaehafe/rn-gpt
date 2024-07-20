//
//  WidgetKitHelper.swift
//  Rngpt
//
//  Created by LEE JAEHA on 7/20/24.
//

import WidgetKit

@available(iOS 14, *)
@objcMembers final class WidgetKitHelper: NSObject {
  
  class func reloadAllTimelines() {
    WidgetCenter.shared.reloadAllTimelines()
  }
}
