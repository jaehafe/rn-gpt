import {NativeModules} from 'react-native';

export class RngptSharedDefaults {
  public async set(obj: Record<string, any>) {
    try {
      //UserDefaults는 NSString을 받기 때문에 JSON.stringify()하여 Write
      const res: boolean = await NativeModules.RngptSharedWidget.set(
        JSON.stringify(obj),
      );
      return res;
    } catch (e) {
      console.warn('[RngptSharedDefaults>>>!!!]', e);
      return false;
    }
  }
}
