//
//  RngptWidget.swift
//  RngptWidget
//
//  Created by LEE JAEHA on 7/18/24.
//

import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), todoData: "Placeholder todo")
    }
  
    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), todoData: "Snapshot todo")
        completion(entry)
    }

//    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
//        let userDefaults = UserDefaults(suiteName: "group.rngptwidget")
//        let todoData = userDefaults?.string(forKey: "rngptWidgetData") ?? "No todo data"
//        
//        let entry = SimpleEntry(date: Date(), todoData: todoData)
//        let timeline = Timeline(entries: [entry], policy: .atEnd)
//        completion(timeline)
//    }
    struct WidgetData: Codable {
        let todo: String
    }
  
//    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
//        let userDefaults = UserDefaults(suiteName: "group.rngptwidget")
//        let widgetDataString = userDefaults?.string(forKey: "rngptWidgetData") ?? "{}"
//      
////        print("Widget data string!!!:", widgetDataString)   디버그 로그
//      
//        NSLog("Widget data string: %@", widgetDataString)
//        
//        let widgetData = (try? JSONDecoder().decode(WidgetData.self, from: Data(widgetDataString.utf8))) ?? WidgetData(todo: "??")
//        let todoData = widgetData.todo
//      
//        print("Parsed todo data:", todoData)  // 추가 디버그 로그
//        NSLog("Parsed todo data: %@", todoData)
//        
//        let entry = SimpleEntry(date: Date(), todoData: todoData)
//        let timeline = Timeline(entries: [entry], policy: .atEnd)
//        completion(timeline)
//    }
  
  func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
      let userDefaults = UserDefaults(suiteName: "group.rngptwidget")
      let widgetDataString = userDefaults?.string(forKey: "rngptWidgetData") ?? "{}"
      
      NSLog("Widget data string: %@", widgetDataString)
      
      do {
          let widgetData = try JSONDecoder().decode(WidgetData.self, from: Data(widgetDataString.utf8))
          let todoData = widgetData.todo
          
          NSLog("Parsed todo data: %@", todoData)
          
          let entry = SimpleEntry(date: Date(), todoData: todoData)
          let timeline = Timeline(entries: [entry], policy: .atEnd)
          completion(timeline)
      } catch {
          NSLog("JSON decoding error: %@", error.localizedDescription)
          let entry = SimpleEntry(date: Date(), todoData: "Error: \(error.localizedDescription)")
          let timeline = Timeline(entries: [entry], policy: .atEnd)
          completion(timeline)
      }
  }

//    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
//        let entry = SimpleEntry(date: Date(), emoji: "😀")
//        completion(entry)
//    }
//
//    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
//        var entries: [SimpleEntry] = []
//
//        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
//        let currentDate = Date()
//        for hourOffset in 0 ..< 5 {
//            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
//            let entry = SimpleEntry(date: entryDate, emoji: "😀")
//            entries.append(entry)
//        }
//
//        let timeline = Timeline(entries: entries, policy: .atEnd)
//        completion(timeline)
//    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let todoData: String
}

//struct RngptWidgetEntryView : View {
//    var entry: Provider.Entry
//
//    var body: some View {
//        VStack {
//            Text("Time:")
//            Text(entry.date, style: .time)
//
//            Text("Emoji:")
//            Text(entry.emoji)
//        }
//    }
//}

struct RngptWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        VStack {
            Text("Todo:")
            Text(entry.todoData)
                .font(.headline)
            Text("Updated:")
            Text(entry.date, style: .time)
                .font(.caption)
        }
    }
}

//struct RngptWidget: Widget {
//    let kind: String = "RngptWidget"
//
//    var body: some WidgetConfiguration {
//        StaticConfiguration(kind: kind, provider: Provider()) { entry in
//            if #available(iOS 17.0, *) {
//                RngptWidgetEntryView(entry: entry)
//                    .containerBackground(.fill.tertiary, for: .widget)
//            } else {
//                RngptWidgetEntryView(entry: entry)
//                    .padding()
//                    .background()
//            }
//        }
//        .configurationDisplayName("My Widget")
//        .description("This is an example widget.")
//    }
//}
//
//#Preview(as: .systemSmall) {
//    RngptWidget()
//} timeline: {
//    SimpleEntry(date: .now, emoji: "😀")
//    SimpleEntry(date: .now, emoji: "🤩")
//}

struct RngptWidget: Widget {
    let kind: String = "RngptWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            if #available(iOS 17.0, *) {
                RngptWidgetEntryView(entry: entry)
                    .containerBackground(.fill.tertiary, for: .widget)
            } else {
                RngptWidgetEntryView(entry: entry)
                    .padding()
                    .background()
            }
        }
        .configurationDisplayName("My Todo Widget")
        .description("This widget displays your todo list.")
    }
}

#Preview(as: .systemSmall) {
    RngptWidget()
} timeline: {
    SimpleEntry(date: .now, todoData: "Sample todo 1")
    SimpleEntry(date: .now, todoData: "Sample todo 2")
}
